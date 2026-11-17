import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { uploadAndCreateVerification } from '@/services/verificationService';

export const dynamic = 'force-dynamic';

const VerificationSuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    collegeName: z.string(),
    documentR2Path: z.string(),
    status: z.enum(['pending', 'approved', 'rejected']),
    createdAt: z.string(),
  }),
});

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
];

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

    // 2. Parse and validate multipart/form-data
    const formData = await request.formData();
    const collegeName = formData.get('collegeName') ?? formData.get('college_name');
    const file = formData.get('file');

    if (!collegeName || typeof collegeName !== 'string' || collegeName.trim().length === 0) {
      return NextResponse.json(
        { error: 'College name is required', code: 'INVALID_COLLEGE_NAME' },
        { status: 400 }
      );
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'Document file is required', code: 'MISSING_FILE' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File size exceeds maximum limit of 10MB', code: 'FILE_TOO_LARGE' },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: 'Invalid file format. Only PDF, JPEG, PNG, and WebP are allowed.',
          code: 'UNSUPPORTED_FILE_TYPE',
        },
        { status: 400 }
      );
    }

    // 3 & 4. Upload to R2 and insert into database via Modular Service
    const record = await uploadAndCreateVerification({
      supabase,
      userId: user.id,
      collegeName: collegeName.trim(),
      file,
    });

    // 5. Return Zod-validated success response
    const payload = {
      success: true as const,
      data: record,
    };

    const validatedResponse = VerificationSuccessResponseSchema.parse(payload);
    return NextResponse.json(validatedResponse, { status: 201 });
  } catch (error) {
    console.error('Error handling upload verification:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { error: errorMessage, code: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}

