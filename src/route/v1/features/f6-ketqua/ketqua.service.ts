import { Injectable } from '@nestjs/common';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import BaseService from '@base-inherit/base.service';
import { KetQuaDocument } from './schemas/ketqua.schema';
import KetQuaRepository from './ketqua.repository';

@Injectable()
export default class KetQuaService extends BaseService<KetQuaDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly ketquaRepository: KetQuaRepository,
  ) {
    super(logger, ketquaRepository);
  }

  public async aggregate(pipeline: any): Promise<any> {
    return this.ketquaRepository.aggregate(pipeline);
  }
}
