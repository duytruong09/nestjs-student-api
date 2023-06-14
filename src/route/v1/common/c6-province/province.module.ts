import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProvinceSchema, Province } from './schemas/province.schema';

import ProvinceController from './province.controller';
import ProvinceService from './province.service';
import ProvinceRepository from './province.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Province.name,
      schema: ProvinceSchema,
    }]),
  ],
  controllers: [ProvinceController],
  providers: [ProvinceService, ProvinceRepository],
  exports: [ProvinceService, ProvinceRepository],
})
export default class ProvinceModule {}
