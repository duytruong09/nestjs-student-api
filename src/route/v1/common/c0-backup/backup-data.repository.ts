import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import { BackupData, BackupDataDocument } from './schemas/backup-data.schema';

@Injectable()
export default class BackupDataRepository extends BaseRepository<BackupDataDocument> {
  private backupDataModel: PaginateModel<BackupDataDocument>;

  constructor(
    @InjectModel(BackupData.name) model: PaginateModel<BackupDataDocument>,
  ) {
    super(model);
    this.backupDataModel = model;
  }
}
