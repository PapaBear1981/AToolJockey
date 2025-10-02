import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AppConfig } from '../config/app.config';

@Injectable()
export class FilesService {
  private readonly s3: S3Client;

  constructor(private readonly config: AppConfig) {
    const { endpoint, accessKey, secretKey } = this.config.s3 as {
      endpoint: string;
      accessKey: string;
      secretKey: string;
    };
    this.s3 = new S3Client({
      region: 'us-east-1',
      forcePathStyle: true,
      endpoint,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });
  }

  async createUploadUrl(key: string, contentType: string) {
    const bucket = (this.config.s3 as { bucket: string }).bucket;
    const command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
    const url = await getSignedUrl(this.s3, command, { expiresIn: 300 });
    return { url, bucket, key };
  }
}
