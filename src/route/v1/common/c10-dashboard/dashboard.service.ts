import { Injectable } from '@nestjs/common';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import BaseService from '@base-inherit/base.service';

import { DashboardDocument } from './schemas/dashboard.schema';
import DashboardRepository from './dashboard.repository';

@Injectable()
export default class DashboardService extends BaseService<DashboardDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly dashboardRepository: DashboardRepository,
  ) {
    super(logger, dashboardRepository);
  }
}
