import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SinhVien, SinhVienSchema } from './schemas/sinhvien.schema';

import SinhVienController from './sinhvien.controller';
import SinhVienService from './sinhvien.service';
import SinhVienRepository from './sinhvien.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SinhVien.name,
        schema: SinhVienSchema,
      },
    ]),
  ],
  controllers: [SinhVienController],
  providers: [SinhVienService, SinhVienRepository],
  exports: [SinhVienService, SinhVienRepository],
})
export default class SinhVienModule {}
