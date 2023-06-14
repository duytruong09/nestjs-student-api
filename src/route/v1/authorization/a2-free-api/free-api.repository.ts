import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import { FreeApi, FreeApiDocument } from './schemas/free-api.schema';

@Injectable()
export default class FreeApiRepository extends BaseRepository<FreeApiDocument> {
  constructor(
    @InjectModel(FreeApi.name)
      FreeAPIModel: PaginateModel<FreeApiDocument>,
  ) {
    super(FreeAPIModel);
  }
}
