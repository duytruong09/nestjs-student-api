import { Module } from '@nestjs/common';

import KhoaModule from '@features/f3-khoa/khoa.module';
import LopModule from '@features/f4-lop/lop.module';
import MonHocModule from '@features/f5-monhoc/monhoc.module';
import KetQuaModule from '@features/f6-ketqua/ketqua.module';
import SinhVienModule from '@features/f7-sinhvien/sinhvien.module';
import BaiTapRepository from './bai-tap.repository';
import BaiTapService from './bai-tap.service';
import BaiTapController from './bai-tap.controller';

@Module({
  imports: [
    SinhVienModule,
    KhoaModule,
    LopModule,
    MonHocModule,
    KetQuaModule,
  ],
  controllers: [BaiTapController],
  providers: [
    BaiTapService,
    BaiTapRepository,
  ],
  exports: [
    BaiTapService,
    BaiTapRepository,
  ],
})
export default class BaiTapModule {}
