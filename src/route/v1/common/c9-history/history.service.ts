import { Injectable } from '@nestjs/common';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import BaseService from '@base-inherit/base.service';

import { HistoryDocument } from './schemas/history.schema';
import HistoryRepository from './history.repository';

@Injectable()
export default class HistoryService extends BaseService<HistoryDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly historyRepository: HistoryRepository,
  ) {
    super(logger, historyRepository);
  }
}
