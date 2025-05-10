import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
  constructor(private readonly configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File) {
    const s3 = new S3({
      accessKeyId: this.configService.get('awsConfig.accessKeyId'),
      secretAccessKey: this.configService.get('awsConfig.secretAccessKey'),
      region: this.configService.get('awsConfig.region'),
    });

    try {
      const upload = await s3
        .upload({
          Bucket: this.configService.get('awsConfig.bucketName') || '',
          Key: this.generateFileName(file),
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      return upload.Key;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  private generateFileName(file: Express.Multer.File) {
    const name = file.originalname.split('.')[0].replace(/\s+/g, '');
    const extension = file.originalname.split('.').pop();
    const timestamp = Date.now();

    return `${name}-${timestamp}-${uuidv4()}.${extension}`;
  }
}
