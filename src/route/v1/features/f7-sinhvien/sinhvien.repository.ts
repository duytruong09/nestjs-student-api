import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import { SinhVien, SinhVienDocument } from './schemas/sinhvien.schema';

@Injectable()
export default class SinhVienRepository extends BaseRepository<SinhVienDocument> {
  constructor(
    @InjectModel(SinhVien.name) model: PaginateModel<SinhVienDocument>,
    @InjectModel(SinhVien.name) private readonly sinhvienModel: PaginateModel<SinhVienDocument>,
  ) {
    super(model);
  }

  public async aggregate(pipeline: any): Promise<any> {
    return this.sinhvienModel.aggregate(pipeline).exec();
  }
}
