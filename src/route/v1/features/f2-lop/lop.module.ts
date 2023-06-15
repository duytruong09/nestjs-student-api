import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LopSchema, Lop } from './schemas/lop.schema';
import LopController from './lop.controller';
import LopService from './lop.service';
import LopRepository from './lop.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Lop.name,
        schema: LopSchema,
      },
    ]),
  ],
  controllers: [
    LopController,
  ],
  providers: [
    LopService,
    LopRepository,
  ],
  exports: [
    LopService,
    LopRepository,
  ],
})
export default class LopModule {}
