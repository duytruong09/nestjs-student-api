import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import { KetQua, KetQuaDocument } from './schemas/ketqua.schema';

@Injectable()
export default class KetQuaRepository extends BaseRepository<KetQuaDocument> {
  private ketquaModel: PaginateModel<KetQuaDocument>

  constructor(
    @InjectModel(KetQua.name) model: PaginateModel<KetQuaDocument>,
    @InjectModel(KetQua.name) ketquaModel: PaginateModel<KetQuaDocument>,
  ) {
    super(model);
    this.ketquaModel = ketquaModel;
  }

  public async aggregate(pipeline: any): Promise<any> {
    return this.ketquaModel.aggregate(pipeline).exec();
  }
}
