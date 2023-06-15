import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Lop } from '../../f2-lop/schemas/lop.schema';

@Schema({ timestamps: true, versionKey: false })
export class SinhVien {
  @Prop({
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 50,
    required: true,
  })
  hoTen: string;

  @Prop({ type: String, required: true })
  nu: string;

  @Prop({ type: Date, required: true })
  ngaySinh: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lop' })
  maLop: Lop;

  @Prop({ type: Number })
  hocBong: number;

  @Prop({ type: String })
  tinh: string;
}

export type SinhVienDocument = SinhVien & mongoose.Document;
export const SinhVienSchema = SchemaFactory.createForClass(SinhVien);
