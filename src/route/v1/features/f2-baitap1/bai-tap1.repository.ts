import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import * as mongoose from 'mongoose';
import { SinhVien, SinhVienDocument } from '@features/f2-sinhvien/schemas/sinhvien.schema';
import { KetQua, KetQuaDocument } from '@features/f2-ketqua/schemas/ketqua.schema';

@Injectable()
export default class BaiTap1Repository {
  private readonly sinhVienModel: PaginateModel<SinhVienDocument>;

  private readonly ketQuaModel: PaginateModel<KetQuaDocument>;

  constructor(
    @InjectModel(SinhVien.name) sinhVienModel: PaginateModel<SinhVienDocument>,
    @InjectModel(KetQua.name) ketQuaModel: PaginateModel<KetQuaDocument>,
  ) {
    this.sinhVienModel = sinhVienModel;
    this.ketQuaModel = ketQuaModel;
  }

  // async aggregate(pipeline: any): Promise<any[]> {
  //   return this.ketQuaModel.aggregate().exec(pipeline);
  // }

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

    return await this.ketQuaModel.aggregate(pipeline).exec();
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

    return await this.sinhVienModel.aggregate(pipeline).exec();
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

    return await this.sinhVienModel.aggregate(pipeline).exec();
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

    return await this.sinhVienModel.aggregate(pipeline).exec();
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

    return await this.sinhVienModel.aggregate(pipeline).exec();
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

    return await this.sinhVienModel.aggregate(pipeline).exec();
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

    return await this.sinhVienModel.aggregate(pipeline).exec();
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

    return await this.sinhVienModel.aggregate(pipeline).exec();
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

    return await this.sinhVienModel.aggregate(pipeline).exec();
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

    return await this.sinhVienModel.aggregate(pipeline).exec();
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
    return await this.sinhVienModel.aggregate(pipeline).exec();
  }

  async cau22(): Promise<any[]> {
    const results = await this.sinhVienModel.find().sort({ hocBong: -1 }).limit(1);

    return results;
  }

  /**
   * cau23
   * @returns
   */
  async cau23(): Promise<any[]> {
    return await this.sinhVienModel.aggregate([
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
    ]).exec();
  }

  async cau25(): Promise<any[]> {
    return await this.sinhVienModel.aggregate([
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
    ]).exec();
  }
}
