import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { uploadAndSaveAvatar } from '@/services/avatarService';

export const dynamic = 'force-dynamic';

const AvatarSuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    avatarUrl: z.string().url(),
    r2Path: z.string(),
  }),
});

const MAX_AVATAR_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user via Supabase Server Client
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'User is not authenticated', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // 2. Parse and validate file upload
    const formData = await request.formData();
    const file = formData.get('avatar') ?? formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'Avatar image file is required', code: 'MISSING_FILE' },
        { status: 400 }
      );
    }

    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'Avatar file size exceeds maximum limit of 5MB', code: 'FILE_TOO_LARGE' },
        { status: 400 }
      );
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: 'Invalid file format. Only JPEG, PNG, and WebP images are allowed.',
          code: 'UNSUPPORTED_FILE_TYPE',
        },
        { status: 400 }
      );
    }

    // 3. Upload to Cloudflare R2 public bucket and update Supabase
    const result = await uploadAndSaveAvatar({
      supabase,
      userId: user.id,
      file,
    });

    // 4. Return Zod-validated success response
    const payload = {
      success: true as const,
      data: result,
    };

    const validatedResponse = AvatarSuccessResponseSchema.parse(payload);
    return NextResponse.json(validatedResponse, { status: 200 });
  } catch (error) {
    console.error('Error handling avatar upload:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { error: errorMessage, code: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}

