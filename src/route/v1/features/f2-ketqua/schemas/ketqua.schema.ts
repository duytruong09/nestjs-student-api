import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { SinhVien } from '../../f2-sinhvien/schemas/sinhvien.schema';
import { MonHoc } from '../../f2-monhoc/schemas/monhoc.schema';

@Schema({ timestamps: true, versionKey: false })
export class KetQua {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SinhVien' })
  masv: SinhVien;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MonHoc' })
  maMH: MonHoc;

  @Prop({ type: Number })
  diemThi: Number;
}

export type KetQuaDocument = KetQua & Document;
export const KetQuaSchema = SchemaFactory.createForClass(KetQua);
