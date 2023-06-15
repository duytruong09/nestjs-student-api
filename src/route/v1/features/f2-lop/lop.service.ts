import { Injectable } from '@nestjs/common';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import BaseService from '@base-inherit/base.service';

import { LopDocument } from './schemas/lop.schema';
import LopRepository from './lop.repository';

@Injectable()
export default class LopService extends BaseService<LopDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly lopRepository: LopRepository,
  ) {
    super(logger, lopRepository);
  }
}
