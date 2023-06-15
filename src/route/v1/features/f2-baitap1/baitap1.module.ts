import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import KhoaService from '@features/f2-khoa/khoa.service';
import KhoaRepository from '@features/f2-khoa/khoa.repository';
import LopService from '@features/f2-lop/lop.service';
import LopRepository from '@features/f2-lop/lop.repository';
import MonHocRepository from '@features/f2-monhoc/monhoc.repository';
import MonHocService from '@features/f2-monhoc/monhoc.service';
import SinhVienService from '@features/f2-sinhvien/sinhvien.service';
import KetQuaService from '@features/f2-ketqua/ketqua.service';
import KetQuaRepository from '@features/f2-ketqua/ketqua.repository';
import SinhVienRepository from '@features/f2-sinhvien/sinhvien.repository';
import SinhVienModule from '@features/f2-sinhvien/sinhvien.module';
import KhoaModule from '@features/f2-khoa/khoa.module';
import LopModule from '@features/f2-lop/lop.module';
import MonHocModule from '@features/f2-monhoc/monhoc.module';
import KetQuaModule from '@features/f2-ketqua/ketqua.module';
import BaiTap1Controller from './bai-tap1.controller';
import BaiTap1Service from './bai-tap1.service';
import BaiTap1Repository from './bai-tap1.repository';

@Module({
  imports: [
    SinhVienModule,
    KhoaModule,
    LopModule,
    MonHocModule,
    KetQuaModule,
  ],
  controllers: [
    BaiTap1Controller,
  ],
  providers: [
    SinhVienService,
    SinhVienRepository,
    KhoaService,
    KhoaRepository,
    LopService,
    LopRepository,
    MonHocService,
    MonHocRepository,
    KetQuaService,
    KetQuaRepository,
    BaiTap1Service,
    BaiTap1Repository,
  ],
  exports: [
    SinhVienService,
    SinhVienRepository,
    KhoaService,
    KhoaRepository,
    LopService,
    LopRepository,
    MonHocService,
    MonHocRepository,
    KetQuaService,
    KetQuaRepository,
    BaiTap1Service,
    BaiTap1Repository,
  ],
})
export default class StudentModule {}
