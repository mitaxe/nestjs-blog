import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { Repository } from 'typeorm';
import Upload from '../upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileTypes } from '../enums/file-types.enum';
import { ConfigService } from '@nestjs/config';
import { UploadFile } from '../interfaces/upload-file.interface';
@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
    private readonly configService: ConfigService,
    private readonly uploadToAwsProvider: UploadToAwsProvider) {

  }

  async uploadFile(file: Express.Multer.File) {
    if (!['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    try {
      const name = await this.uploadToAwsProvider.uploadFile(file);

      const uploadFile: UploadFile = {
        name: name,
        path: `${this.configService.get('awsConfig.cloudfrontUrl')}/${name}`,
        type: FileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      }
  
      const uploadEntity = this.uploadRepository.create(uploadFile);
  
      return await this.uploadRepository.save(uploadEntity);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
