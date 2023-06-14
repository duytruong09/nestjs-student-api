import { Injectable } from '@nestjs/common';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import BaseService from '@base-inherit/base.service';

import { SpecializeDocument } from './schemas/specialize.schema';
import SpecializeRepository from './specialize.repository';

@Injectable()
export default class SpecializeService extends BaseService<SpecializeDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly specializeRepository: SpecializeRepository,
  ) {
    super(logger, specializeRepository);
  }
}
