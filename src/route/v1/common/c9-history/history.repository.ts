import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import { History, HistoryDocument } from './schemas/history.schema';

@Injectable()
export default class HistoryRepository extends BaseRepository<HistoryDocument> {
  constructor(
    @InjectModel(History.name) model: PaginateModel<HistoryDocument>,
  ) {
    super(model);
  }
}
