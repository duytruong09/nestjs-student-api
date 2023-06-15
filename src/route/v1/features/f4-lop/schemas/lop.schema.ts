import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Khoa } from '../../f3-khoa/schemas/khoa.schema';

@Schema({ timestamps: true, versionKey: false })
export class Lop {
  @Prop({ type: String, trim: true, required: true })
  tenLop: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Khoa' })
  maKhoa: Khoa;
}

export type LopDocument = Lop & mongoose.Document;
export const LopSchema = SchemaFactory.createForClass(Lop);
