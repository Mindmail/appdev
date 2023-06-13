export const s3Config = {
  accessKeyId: import.meta.env.VITE_APP_ACCESS_KEY_ID ?? '',
  bucketName: import.meta.env.VITE_APP_BUCKET_NAME ?? '',
  region: import.meta.env.VITE_APP_REGION ?? '',
  s3Url: import.meta.env.VITE_APP_S3URL ?? '',
  secretAccessKey: import.meta.env.VITE_APP_SECRET_ACCESS_KEY ?? '',
}
