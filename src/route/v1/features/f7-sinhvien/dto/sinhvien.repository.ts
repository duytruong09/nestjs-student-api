import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import { SinhVien, SinhVienDocument } from '../schemas/sinhvien.schema';

@Injectable()
export default class SinhVienRepository extends BaseRepository<SinhVienDocument> {
  constructor(
    @InjectModel(SinhVien.name) model: PaginateModel<SinhVienDocument>,
  ) {
    super(model);
  }
}
