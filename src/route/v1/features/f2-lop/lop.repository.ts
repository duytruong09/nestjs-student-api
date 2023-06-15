import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import { Lop, LopDocument } from './schemas/lop.schema';

@Injectable()
export default class LopRepository extends BaseRepository<LopDocument> {
  constructor(
    @InjectModel(Lop.name) model: PaginateModel<LopDocument>,
  ) {
    super(model);
  }
}
