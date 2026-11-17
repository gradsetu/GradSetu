import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getPresignedDocumentUrl, isR2Configured } from '@/lib/r2';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const QuerySchema = z.object({
  key: z.string().min(5),
});

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const parseResult = QuerySchema.safeParse({
      key: searchParams.get('key'),
    });

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'A valid document key is required', code: 'INVALID_KEY' },
        { status: 400 }
      );
    }

    const { key } = parseResult.data;

    // Check user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const isAdmin = profile?.role === 'admin';
    const isOwner = key.startsWith(`verifications/${user.id}`);

    // Confidentiality rule: only admin or the document owner may view it
    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        {
          error: 'Forbidden: You do not have permission to view this document',
          code: 'FORBIDDEN',
        },
        { status: 403 }
      );
    }

    let downloadUrl = '';

    // 1. Try R2 if configured
    if (isR2Configured) {
      try {
        downloadUrl = await getPresignedDocumentUrl(key, 900);
      } catch (r2Error) {
        console.warn('R2 presigned URL failed, falling back to Supabase Storage:', r2Error);
      }
    }

    // 2. Fallback to Supabase Storage signed URL
    if (!downloadUrl) {
      const { data: signedData, error: signedError } = await supabase.storage
        .from('gradsetu-verifications')
        .createSignedUrl(key, 900);

      if (signedError || !signedData?.signedUrl) {
        throw new Error(signedError?.message || 'Failed to generate signed document URL');
      }
      downloadUrl = signedData.signedUrl;
    }

    return NextResponse.json({
      success: true,
      downloadUrl,
      expiresIn: 900,
    });
  } catch (error) {
    console.error('Error generating document pre-signed URL:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
        code: 'INTERNAL_SERVER_ERROR',
      },
      { status: 500 }
    );
  }
}
