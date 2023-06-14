import { Injectable } from '@nestjs/common';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import BaseService from '@base-inherit/base.service';
import VillageRepository from './village.repository';
import { VillageDocument } from './schemas/village.schema';

@Injectable()
export default class VillageService extends BaseService<VillageDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly provinceRepository: VillageRepository,
  ) {
    super(logger, provinceRepository);
  }
}
