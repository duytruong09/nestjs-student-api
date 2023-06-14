import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SpecializeSchema, Specialize } from './schemas/specialize.schema';

import SpecializeController from './specialize.controller';
import SpecializeService from './specialize.service';
import SpecializeRepository from './specialize.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Specialize.name,
        schema: SpecializeSchema,
      },
    ]),
  ],
  controllers: [SpecializeController],
  providers: [SpecializeService, SpecializeRepository],
  exports: [SpecializeService, SpecializeRepository],
})
export default class SpecializeModule {}
