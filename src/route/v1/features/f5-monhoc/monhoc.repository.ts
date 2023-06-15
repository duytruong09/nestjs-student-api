import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import { MonHoc, MonHocDocument } from './schemas/monhoc.schema';

@Injectable()
export default class MonHocRepository extends BaseRepository<MonHocDocument> {
  constructor(
    @InjectModel(MonHoc.name) model: PaginateModel<MonHocDocument>,
  ) {
    super(model);
  }
}
