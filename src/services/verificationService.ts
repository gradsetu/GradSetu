import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, isR2Configured } from '@/lib/r2';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface UploadVerificationParams {
  supabase: SupabaseClient;
  userId: string;
  collegeName: string;
  file: File;
}

export interface VerificationRecord {
  id: string;
  userId: string;
  collegeName: string;
  documentR2Path: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export async function uploadAndCreateVerification({
  supabase,
  userId,
  collegeName,
  file,
}: UploadVerificationParams): Promise<VerificationRecord> {
  const timestamp = Date.now();
  const fileExtension = file.name.split('.').pop() || 'bin';
  const filePath = `verifications/${userId}-${timestamp}.${fileExtension}`;
  const bucketName = process.env.R2_VERIFICATIONS_BUCKET_NAME || 'gradsetu-verifications';

  const fileBytes = await file.arrayBuffer();
  const fileBuffer = Buffer.from(fileBytes);

  let uploadedToR2 = false;

  // 1. Attempt Cloudflare R2 if configured
  if (isR2Configured) {
    try {
      const putCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: filePath,
        Body: fileBuffer,
        ContentType: file.type || 'application/octet-stream',
      });
      await r2Client.send(putCommand);
      uploadedToR2 = true;
    } catch (r2Error) {
      console.warn('R2 upload failed, falling back to Supabase Storage:', r2Error);
    }
  }

  // 2. Fallback to Supabase Storage if R2 not configured or failed
  if (!uploadedToR2) {
    const { error: uploadError } = await supabase.storage
      .from('gradsetu-verifications')
      .upload(filePath, fileBuffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: true,
      });

    if (uploadError) {
      console.error('Supabase verification upload error:', uploadError);
      throw new Error(`Failed to upload verification document: ${uploadError.message}`);
    }
  }

  // 3. Insert row into Supabase student_verifications table
  const { data, error } = await supabase
    .from('student_verifications')
    .insert({
      user_id: userId,
      college_name: collegeName,
      document_r2_path: filePath,
      status: 'pending',
    })
    .select('id, user_id, college_name, document_r2_path, status, created_at')
    .single();

  if (error || !data) {
    throw new Error(error ? error.message : 'Failed to create student verification record');
  }

  // 4. Update mentor profile verification status if exists
  await supabase
    .from('mentor_profiles')
    .update({
      verification_status: 'pending',
      verification_document_url: filePath,
      verification_submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  return {
    id: data.id,
    userId: data.user_id,
    collegeName: data.college_name,
    documentR2Path: data.document_r2_path,
    status: data.status,
    createdAt: data.created_at,
  };
}
