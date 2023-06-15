import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import { KetQua, KetQuaDocument } from './schemas/ketqua.schema';

@Injectable()
export default class KetQuaRepository extends BaseRepository<KetQuaDocument> {
  constructor(
    @InjectModel(KetQua.name) model: PaginateModel<KetQuaDocument>,
  ) {
    super(model);
  }
}
