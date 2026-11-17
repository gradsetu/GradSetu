import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, isR2Configured } from '@/lib/r2';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface UploadAvatarParams {
  supabase: SupabaseClient;
  userId: string;
  file: File;
}

export interface AvatarUploadResult {
  avatarUrl: string;
  r2Path: string;
}

export async function uploadAndSaveAvatar({
  supabase,
  userId,
  file,
}: UploadAvatarParams): Promise<AvatarUploadResult> {
  const timestamp = Date.now();
  const fileExtension = file.name.split('.').pop() || 'jpg';
  const filePath = `avatars/${userId}-${timestamp}.${fileExtension}`;
  const bucketName = process.env.R2_PUBLIC_AVATARS_BUCKET_NAME || 'gradsetu-avatars';

  const fileBytes = await file.arrayBuffer();
  const fileBuffer = Buffer.from(fileBytes);

  let avatarUrl = '';

  // 1. Attempt Cloudflare R2 if configured
  if (isR2Configured) {
    try {
      const putCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: filePath,
        Body: fileBuffer,
        ContentType: file.type || 'image/jpeg',
      });

      await r2Client.send(putCommand);

      const publicBaseUrl = process.env.R2_PUBLIC_AVATARS_BASE_URL;
      avatarUrl = publicBaseUrl
        ? `${publicBaseUrl.replace(/\/$/, '')}/${filePath}`
        : `https://pub-r2.gradsetu.com/${filePath}`;
    } catch (r2Error) {
      console.warn('R2 upload failed, falling back to Supabase Storage:', r2Error);
    }
  }

  // 2. Seamless fallback to Supabase Storage
  if (!avatarUrl) {
    const { error: uploadError } = await supabase.storage
      .from('gradsetu-avatars')
      .upload(filePath, fileBuffer, {
        contentType: file.type || 'image/jpeg',
        upsert: true,
      });

    if (uploadError) {
      console.error('Supabase storage upload error:', uploadError);
      throw new Error(`Failed to upload avatar: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from('gradsetu-avatars')
      .getPublicUrl(filePath);

    avatarUrl = publicUrlData.publicUrl;
  }

  // 3. Update public.profiles
  await supabase
    .from('profiles')
    .update({
      avatar: avatarUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  // 4. Update public.mentor_profiles if user is a mentor
  await supabase
    .from('mentor_profiles')
    .update({
      avatar: avatarUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  return {
    avatarUrl,
    r2Path: filePath,
  };
}
