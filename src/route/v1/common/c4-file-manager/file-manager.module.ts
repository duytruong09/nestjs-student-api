import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileManagerSchema, FileManager } from './schemas/file-manager.schema';

import FileManagerController from './file-manager.controller';
import FileManagerService from './file-manager.service';
import FileManagerRepository from './file-manager.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{
      name: FileManager.name,
      schema: FileManagerSchema,
    }]),
  ],
  controllers: [FileManagerController],
  providers: [FileManagerService, FileManagerRepository],
  exports: [FileManagerService, FileManagerRepository],
})
export default class FileManagerModule {}
