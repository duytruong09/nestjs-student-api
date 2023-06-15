import { Injectable } from '@nestjs/common';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import BaseService from '@base-inherit/base.service';
import { SinhVienDocument } from '@features/f2-sinhvien/schemas/sinhvien.schema';
import SinhVienRepository from '@features/f2-sinhvien/dto/sinhvien.repository';
import SinhVienService from '@features/f2-sinhvien/sinhvien.service';
import LopService from '@features/f2-lop/lop.service';
import KetQuaService from '@features/f2-ketqua/ketqua.service';
import * as mongoose from 'mongoose';
import BaiTap1Repository from './bai-tap1.repository';

@Injectable()
export default class BaiTap1Service extends BaseService<SinhVienDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly model: SinhVienRepository,
    readonly baiTap1Repository: BaiTap1Repository,
    readonly sinhvienService: SinhVienService,
    readonly lopService: LopService,
    readonly ketquaService: KetQuaService,
  ) {
    super(logger, model);
    this.model = model;
    this.baiTap1Repository = baiTap1Repository;
  }

  async cau1(query: any): Promise<any> {
    const pipeline = {
      filter: query,
      projection: {
        tenLop: 1,
        maKhoa: 1,
      },
    };
    return this.lopService.findManyBy(pipeline);
  }

  async cau2(query: any): Promise<any> {
    const pipeline = {
      filter: query,
      projection: {
        hoTen: 1,
        nu: 1,
        hocBong: 1,
      },
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau3(query: any): Promise<any> {
    const pipeline = {
      filter: {
        hocBong: { $gt: 0 },
      },
      projection: {
        nu: 1,
        hocBong: 1,
      },
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau4(query: any): Promise<any> {
    const pipeline = {
      filter: {
        nu: 'Yes',
      },
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau5(query: any): Promise<any> {
    const pipeline = {
      filter: {
        hoTen: { $regex: '.*Tran.*' },
      },
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau6(query: any): Promise<any> {
    const pipeline = {
      filter: {
        nu: 'Yes',
        hocBong: { $gt: 0 },
      },
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau7(query: any): Promise<any> {
    const pipeline = {
      filter: {
        $or: [
          { nu: 'Yes' },
          { hocBong: { $gt: 0 } },
        ],
      },
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau8(query: any): Promise<any> {
    const pipeline = {
      filter: {
        ngaySinh: {
          $gte: new Date('1978-01-01T00:00:00Z'),
          $lt: new Date('1986-01-01T00:00:00Z'),
        },
      },
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau9(query: any): Promise<any> {
    const pipeline = {
      sort: '_id',
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau10(query: any): Promise<any> {
    const pipeline = {
      sort: '-hocBong',
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau11(): Promise<any> {
    return this.baiTap1Repository.cau11();
  }

  async cau12(): Promise<any> {
    return this.baiTap1Repository.cau12();
  }

  async cau13(): Promise<any> {
    return this.baiTap1Repository.cau13();
  }

  async cau14(): Promise<any> {
    return this.baiTap1Repository.cau14();
  }

  async cau15(): Promise<any> {
    return this.baiTap1Repository.cau15();
  }

  async cau16(): Promise<any> {
    return this.baiTap1Repository.cau16();
  }

  async cau17(): Promise<any> {
    return this.baiTap1Repository.cau17();
  }

  async cau18(): Promise<any> {
    return this.baiTap1Repository.cau18();
  }

  async cau19(): Promise<any> {
    return this.baiTap1Repository.cau19();
  }

  async cau20(): Promise<any> {
    return this.baiTap1Repository.cau20();
  }

  async cau21(): Promise<any> {
    return this.baiTap1Repository.cau21();
  }

  async cau22(): Promise<any> {
    return this.baiTap1Repository.cau22();
  }

  async cau23(): Promise<any> {
    return this.baiTap1Repository.cau23();
  }

  async cau24(): Promise<any> {
    const ketQuaResult = await this.ketquaService.findManyBy({
      filter: {
        maMH: new mongoose.Types.ObjectId('648965fc54c6f5e9830a6286'),
      },
      projection: ['maSV'],
    });
    const results = await this.sinhvienService.findManyBy({
      filter: {
        _id: {
          $nin: ketQuaResult.map((item: any) => item.maSV),
        },
      },
    });

    return results;
  }

  async cau25(): Promise<any> {
    return this.baiTap1Repository.cau25();
  }
}
