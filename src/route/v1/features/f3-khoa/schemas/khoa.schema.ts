import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Khoa {
  @Prop({ type: String, trim: true, required: true })
  tenKhoa: string;

  @Prop({ type: Number, required: true })
  soCBGD: number;
}

export type KhoaDocument = Khoa & Document;
export const KhoaSchema = SchemaFactory.createForClass(Khoa);
