import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import { Khoa, KhoaDocument } from './schemas/khoa.schema';

@Injectable()
export default class KhoaRepository extends BaseRepository<KhoaDocument> {
  constructor(
    @InjectModel(Khoa.name) model: PaginateModel<KhoaDocument>,
  ) {
    super(model);
  }
}
