import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DistrictSchema, District } from './schemas/district.schema';

import DistrictController from './district.controller';
import DistrictService from './district.service';
import DistrictRepository from './district.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: District.name,
      schema: DistrictSchema,
    }]),
  ],
  controllers: [DistrictController],
  providers: [DistrictService, DistrictRepository],
  exports: [DistrictService, DistrictRepository],
})
export default class DistrictModule {}
