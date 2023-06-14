import { Injectable } from '@nestjs/common';
import { DistrictDocument } from '@common/c7-district/schemas/district.schema';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import BaseService from '@base-inherit/base.service';
import DistrictRepository from './district.repository';

@Injectable()
export default class DistrictService extends BaseService<DistrictDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly provinceRepository: DistrictRepository,
  ) {
    super(logger, provinceRepository);
  }
}
