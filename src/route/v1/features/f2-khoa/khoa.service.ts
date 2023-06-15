import { Injectable } from '@nestjs/common';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import BaseService from '@base-inherit/base.service';

import { KhoaDocument } from './schemas/khoa.schema';
import KhoaRepository from './khoa.repository';

@Injectable()
export default class KhoaService extends BaseService<KhoaDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly khoaRepository: KhoaRepository,
  ) {
    super(logger, khoaRepository);
  }
}
