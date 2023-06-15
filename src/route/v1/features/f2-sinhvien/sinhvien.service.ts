import { Injectable } from '@nestjs/common';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import BaseService from '@base-inherit/base.service';
import { SinhVienDocument } from './schemas/sinhvien.schema';

import SinhVienRepository from './sinhvien.repository';

@Injectable()
export default class SinhVienService extends BaseService<SinhVienDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly sinhvienRepository: SinhVienRepository,
  ) {
    super(logger, sinhvienRepository);
  }
}
