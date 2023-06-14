import {
  PaginateModel,
} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import BaseRepository from '@base-inherit/base.repository';
import { Village, VillageDocument } from './schemas/village.schema';

@Injectable()
export default class VillageRepository extends BaseRepository<VillageDocument> {
  constructor(
    @InjectModel(Village.name) model: PaginateModel<VillageDocument>,
  ) {
    super(model);
  }
}
