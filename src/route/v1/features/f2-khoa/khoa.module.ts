import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KhoaSchema, Khoa } from './schemas/khoa.schema';
import KhoaController from './khoa.controller';
import KhoaService from './khoa.service';
import KhoaRepository from './khoa.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Khoa.name,
        schema: KhoaSchema,
      },
    ]),
  ],
  controllers: [
    KhoaController,
  ],
  providers: [
    KhoaService,
    KhoaRepository,
  ],
  exports: [
    KhoaService,
    KhoaRepository,
  ],
})
export default class KhoaModule {}
