import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import {
  Province,
  ProvinceDocument,
} from '@common/c6-province/schemas/province.schema';
import BaseRepository from '@base-inherit/base.repository';

@Injectable()
export default class ProvinceRepository extends BaseRepository<ProvinceDocument> {
  constructor(
    @InjectModel(Province.name) model: PaginateModel<ProvinceDocument>,
  ) {
    super(model);
  }
}
