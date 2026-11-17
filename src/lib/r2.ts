import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

export const isR2Configured = Boolean(
  accountId &&
  accessKeyId &&
  secretAccessKey &&
  accountId.trim().length > 0 &&
  accessKeyId.trim().length > 0 &&
  secretAccessKey.trim().length > 0
);

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: isR2Configured
    ? `https://${accountId}.r2.cloudflarestorage.com`
    : 'https://placeholder.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: accessKeyId || 'placeholder-key',
    secretAccessKey: secretAccessKey || 'placeholder-secret',
  },
});

/**
 * Generates a temporary pre-signed URL to securely access a private verification document from Cloudflare R2.
 * Defaults to 15-minute expiration (900 seconds).
 */
export async function getPresignedDocumentUrl(
  key: string,
  expiresInSeconds = 900
): Promise<string> {
  if (!isR2Configured) {
    throw new Error('Cloudflare R2 is not configured.');
  }

  const bucketName = process.env.R2_VERIFICATIONS_BUCKET_NAME || 'gradsetu-verifications';

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return await getSignedUrl(r2Client, command, { expiresIn: expiresInSeconds });
}
