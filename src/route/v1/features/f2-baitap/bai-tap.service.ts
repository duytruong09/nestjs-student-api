import { Injectable } from '@nestjs/common';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import BaseService from '@base-inherit/base.service';
import { SinhVienDocument } from '@features/f7-sinhvien/schemas/sinhvien.schema';
import SinhVienRepository from '@features/f7-sinhvien/dto/sinhvien.repository';
import SinhVienService from '@features/f7-sinhvien/sinhvien.service';
import LopService from '@features/f4-lop/lop.service';
import KetQuaService from '@features/f6-ketqua/ketqua.service';
import * as mongoose from 'mongoose';
<<<<<<< HEAD
import lodash from 'lodash';
=======
>>>>>>> 5c729144f243849e465ca3e3a483fe0d96536ae8
import BaiTapRepository from './bai-tap.repository';

@Injectable()
export default class BaiTapService {
  constructor(
    readonly logger: CustomLoggerService,
    readonly baiTapRepository: BaiTapRepository,
    readonly sinhvienService: SinhVienService,
    readonly lopService: LopService,
    readonly ketquaService: KetQuaService,
  ) {
    this.baiTapRepository = baiTapRepository;
  }

  async cau1(): Promise<any> {
    const pipeline = {
      projection: {
        tenLop: 1,
        maKhoa: 1,
      },
    };
    return this.lopService.findManyBy(pipeline);
  }

  async cau2(): Promise<any> {
    const pipeline = {
      projection: {
        hoTen: 1,
        nu: 1,
        hocBong: 1,
      },
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau3(): Promise<any> {
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

  async cau4(): Promise<any> {
    const pipeline = {
      filter: {
        nu: 'Yes',
      },
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau5(): Promise<any> {
    const pipeline = {
      filter: {
        hoTen: { $regex: '.*Tran.*' },
      },
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau6(): Promise<any> {
    const pipeline = {
      filter: {
        nu: 'Yes',
        hocBong: { $gt: 0 },
      },
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau7(): Promise<any> {
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

  async cau8(): Promise<any> {
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

  async cau9(): Promise<any> {
    const pipeline = {
      sort: '_id',
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau10(): Promise<any> {
    const pipeline = {
      sort: '-hocBong',
    };
    return this.sinhvienService.findManyBy(pipeline);
  }

  async cau11(): Promise<any[]> {
    const pipeline = [
      {
        $lookup: {
          from: 'sinhviens',
          localField: 'maSV',
          foreignField: '_id',
          as: 'sinhvien',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { $arrayElemAt: ['$sinhvien', 0] }, '$$ROOT',
            ],
          },
        },
      },
      {
        $match: {
          $and: [
            {
              maMH: new mongoose.Types.ObjectId('6489660b54c6f5e9830a6288'),
            },
            {
              diemThi: { $gte: 8 },
            },
          ],
        },
      },
      {
        $project: {
          _id: 1, hoTen: 1, nu: 1, ngaySinh: 1, diemThi: 1,
        },
      },
    ];

    return await this.ketquaService.aggregate(pipeline);
  }

  async cau12(): Promise<any[]> {
    const pipeline = [
      {
        $lookup: {
          from: 'lops',
          localField: 'maLop',
          foreignField: '_id',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      { $project: { lop: 0 } },
      {
        $match: {
          $and: [
            { hocBong: { $gt: 0 } },
            { maKhoa: new mongoose.Types.ObjectId('64896231b5d0aaf088714c09') }],
        },
      },
      {
        $project: {
          _id: 1, hoTen: 1, hocBong: 1, tenLop: 1,
        },
      },
    ];

    return await this.sinhvienService.aggregate(pipeline);
  }

  async cau13(): Promise<any[]> {
    const pipeline = [
      {
        $lookup: {
          from: 'lops',
          localField: 'maLop',
          foreignField: '_id',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      { $project: { lop: 0 } },
      {
        $lookup: {
          from: 'khoas',
          localField: 'maKhoa',
          foreignField: '_id',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      { $project: { khoa: 0 } },
      {
        $match: {
          $and: [{ hocBong: { $gt: 0 } }, { maKhoa: new mongoose.Types.ObjectId('64896231b5d0aaf088714c09') }],
        },
      },
      {
        $project: {
          _id: 1, hoTen: 1, hocBong: 1, tenLop: 1, tenKhoa: 1,
        },
      },
    ];

    return await this.sinhvienService.aggregate(pipeline);
  }

  async cau14(): Promise<any[]> {
    const pipeline = [
      {
        $group: { _id: '$maLop', soluongSV: { $sum: 1 } },
      },
      {
        $lookup: {
          from: 'lops',
          localField: '_id',
          foreignField: '_id',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $project: { _id: 1, tenLop: 1, soluongSV: 1 },
      },
    ];

    return await this.sinhvienService.aggregate(pipeline);
  }

  async cau15(): Promise<any[]> {
    const pipeline = [
      {
        $lookup: {
          from: 'lops',
          localField: 'maLop',
          foreignField: '_id',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $lookup: {
          from: 'khoas',
          localField: 'maKhoa',
          foreignField: '_id',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $group: { _id: '$maKhoa', tenKhoa: { $first: '$tenKhoa' }, soluongSV: { $sum: 1 } },
      },
    ];

    return await this.sinhvienService.aggregate(pipeline);
  }

  async cau16(): Promise<any[]> {
    const pipeline = [
      {
        $match: { nu: 'Yes' },
      },
      {
        $lookup: {
          from: 'lops',
          localField: 'maLop',
          foreignField: '_id',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $lookup: {
          from: 'khoas',
          localField: 'maKhoa',
          foreignField: '_id',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $group: { _id: '$maKhoa', tenKhoa: { $first: '$tenKhoa' }, soluongSV: { $sum: 1 } },
      },
    ];

    return await this.sinhvienService.aggregate(pipeline);
  }

  async cau17(): Promise<any[]> {
    const pipeline = [
      {
        $lookup: {
          from: 'lops',
          localField: 'maLop',
          foreignField: '_id',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $group: { _id: '$maLop', tenLop: { $first: '$tenLop' }, tongHB: { $sum: '$hocBong' } },
      },
    ];

    return await this.sinhvienService.aggregate(pipeline);
  }

  async cau18(): Promise<any[]> {
    const pipeline = [
      {
        $lookup: {
          from: 'lops',
          localField: 'maLop',
          foreignField: '_id',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $lookup: {
          from: 'khoas',
          localField: 'maKhoa',
          foreignField: '_id',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $group: { _id: '$maLop', tenKhoa: { $first: '$tenKhoa' }, tongHB: { $sum: '$hocBong' } },
      },
    ];

    return await this.sinhvienService.aggregate(pipeline);
  }

  async cau19(): Promise<any[]> {
    const pipeline = [
      {
        $lookup: {
          from: 'lops',
          localField: 'maLop',
          foreignField: '_id',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $lookup: {
          from: 'khoas',
          localField: 'maKhoa',
          foreignField: '_id',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $group: { _id: '$maLop', tenKhoa: { $first: '$tenKhoa' }, soluongSV: { $sum: 1 } },
      },
      {
        $match: {
          soluongSV: { $gt: 100 },
        },
      },
    ];

    return await this.sinhvienService.aggregate(pipeline);
  }

  async cau20(): Promise<any[]> {
    const pipeline = [
      {
        $match: { nu: 'Yes' },
      },
      {
        $lookup: {
          from: 'lops',
          localField: 'maLop',
          foreignField: '_id',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $lookup: {
          from: 'khoas',
          localField: 'maKhoa',
          foreignField: '_id',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $group: { _id: '$maLop', tenKhoa: { $first: '$tenKhoa' }, soluongSV: { $sum: 1 } },
      },
      {
        $match: {
          soluongSV: { $gte: 50 },
        },
      },
    ];

    return await this.sinhvienService.aggregate(pipeline);
  }

  async cau21(): Promise<any[]> {
    const pipeline = [
      {
        $lookup: {
          from: 'lops',
          localField: 'maLop',
          foreignField: '_id',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $lookup: {
          from: 'khoas',
          localField: 'maKhoa',
          foreignField: '_id',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $group: { _id: '$maLop', tenKhoa: { $first: '$tenKhoa' }, tongHB: { $sum: '$hocBong' } },
      },
      {
        $match: { tongHB: { $gte: 1000000 } },
      },
    ];
    return await this.sinhvienService.aggregate(pipeline);
  }

  async cau22(): Promise<any[]> {
    const results: any[] = await this.sinhvienService.findManyBy({
      sort: '-hocBong',
    });
    return lodash.head(results);
  }

  /**
   * cau23
   * @returns
   */
  async cau23(): Promise<any[]> {
    return await this.sinhvienService.aggregate([
      {
        $lookup: {
          from: 'ketquas',
          localField: '_id',
          foreignField: 'maSV',
          as: 'ketQua',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { $arrayElemAt: ['$ketQua', 0] }, '$$ROOT'],
          },
        },
      },
      {
        $project: { ketQua: 0 },
      },
      {
        $match: {
          maMH: new mongoose.Types.ObjectId('61862d09a941e609e8fd4cd3'),
        },
      },
      {
        $sort: {
          diemThi: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);
  }

  async cau24(): Promise<any[]> {
    const ketQuaResult = await this.ketquaService.findManyBy({
      filter: {
        maMH: new mongoose.Types.ObjectId('61862d09a941e609e8fd4cd3'),
      },
      projection: ['maSV'],
    });
    const results = await this.sinhvienService.findManyBy({
      filter: {
        _id: {
          $nin: ketQuaResult.map((x: any) => x.maSV),
        },
      },
    });
    return results;
  }

  async cau25(): Promise<any[]> {
    return await this.sinhvienService.aggregate([
      {
        $lookup: {
          from: 'lops',
          localField: 'maLop',
          foreignField: '_id',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $lookup: {
          from: 'khoas',
          localField: 'maKhoa',
          foreignField: '_id',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $group: { _id: '$maLop', tenKhoa: { $first: '$tenKhoa' }, SoLuongSV: { $sum: 1 } },
      },
      {
        $sort: { SoLuongSV: -1 },
      },
      {
        $limit: 1,
      },
    ]);
  }
}
