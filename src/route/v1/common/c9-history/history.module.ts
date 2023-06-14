import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HistorySchema, History } from './schemas/history.schema';

import HistoryController from './history.controller';
import HistoryService from './history.service';
import HistoryRepository from './history.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: History.name,
        schema: HistorySchema,
      },
    ]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService, HistoryRepository],
  exports: [HistoryService, HistoryRepository],
})
export default class HistoryModule {}
