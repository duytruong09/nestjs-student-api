import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import {
  District,
  DistrictDocument,
} from '@common/c7-district/schemas/district.schema';
import BaseRepository from '@base-inherit/base.repository';

@Injectable()
export default class DistrictRepository extends BaseRepository<DistrictDocument> {
  constructor(
    @InjectModel(District.name) model: PaginateModel<DistrictDocument>,
  ) {
    super(model);
  }
}
