import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonHocSchema, MonHoc } from './schemas/monhoc.schema';
import MonHocController from './monhoc.controller';
import MonHocService from './monhoc.service';
import MonHocRepository from './monhoc.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MonHoc.name,
        schema: MonHocSchema,
      },
    ]),
  ],
  controllers: [
    MonHocController,
  ],
  providers: [
    MonHocService,
    MonHocRepository,
  ],
  exports: [
    MonHocService,
    MonHocRepository,
  ],
})
export default class MonHocModule {}
