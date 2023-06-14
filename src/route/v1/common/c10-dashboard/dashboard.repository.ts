import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import { Dashboard, DashboardDocument } from './schemas/dashboard.schema';

@Injectable()
export default class dashboardRepository extends BaseRepository<DashboardDocument> {
  constructor(
    @InjectModel(Dashboard.name) model: PaginateModel<DashboardDocument>,
  ) {
    super(model);
  }
}
