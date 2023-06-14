import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VillageSchema, Village } from './schemas/village.schema';

import VillageController from './village.controller';
import VillageService from './village.service';
import VillageRepository from './village.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Village.name,
      schema: VillageSchema,
    }]),
  ],
  controllers: [VillageController],
  providers: [VillageService, VillageRepository],
  exports: [VillageService, VillageRepository],
})
export default class VillageModule {}
