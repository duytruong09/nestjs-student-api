import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import { Specialize, SpecializeDocument } from './schemas/specialize.schema';

@Injectable()
export default class SpecializeRepository extends BaseRepository<SpecializeDocument> {
  constructor(
    @InjectModel(Specialize.name) model: PaginateModel<SpecializeDocument>,
  ) {
    super(model);
  }
}
