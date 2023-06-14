import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import {
  FileManager,
  FileManagerDocument,
} from '@common/c4-file-manager/schemas/file-manager.schema';
import BaseRepository from '@base-inherit/base.repository';

@Injectable()
export default class FileManagerRepository extends BaseRepository<FileManagerDocument> {
  constructor(
    @InjectModel(FileManager.name) model: PaginateModel<FileManagerDocument>,
  ) {
    super(model);
  }
}
