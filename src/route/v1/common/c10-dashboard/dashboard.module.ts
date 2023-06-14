import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DashboardSchema, Dashboard } from './schemas/dashboard.schema';

import DashboardController from './dashboard.controller';
import DashboardService from './dashboard.service';
import DashboardRepository from './dashboard.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Dashboard.name,
        schema: DashboardSchema,
      },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository],
  exports: [DashboardService, DashboardRepository],
})
export default class DashboardModule {}
