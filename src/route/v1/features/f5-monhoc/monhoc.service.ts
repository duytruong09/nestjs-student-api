import { Injectable } from '@nestjs/common';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import BaseService from '@base-inherit/base.service';

import { MonHocDocument } from './schemas/monhoc.schema';
import MonHocRepository from './monhoc.repository';

@Injectable()
export default class MonHocService extends BaseService<MonHocDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly monhocRepository: MonHocRepository,
  ) {
    super(logger, monhocRepository);
  }
}
