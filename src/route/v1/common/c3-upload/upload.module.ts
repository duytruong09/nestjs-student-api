import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import UserModule from '@authorization/a1-user/user.module';
import UploadRepository from './upload.repository';

import UploadController from './upload.controller';
import UploadLocalService from './upload-local.service';
import UploadS3Service from './upload-s3.service';

@Module({
  imports: [UserModule, PassportModule],
  providers: [UploadS3Service, UploadRepository, UploadLocalService],
  controllers: [UploadController],
  exports: [UploadS3Service, UploadRepository, UploadLocalService],
})
export default class UploadModule {}
