import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { KetQuaSchema, KetQua } from './schemas/ketqua.schema';

import KetQuaController from './ketqua.controller';
import KetQuaService from './ketqua.service';
import KetQuaRepository from './ketqua.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: KetQua.name,
        schema: KetQuaSchema,
      },
    ]),
  ],
  controllers: [KetQuaController],
  providers: [KetQuaService, KetQuaRepository],
  exports: [KetQuaService, KetQuaRepository],
})
export default class KetQuaModule {}
