import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class MonHoc {
  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  tenMH: string;

  @Prop({
    type: Number,
    min: 1,
    required: true,
  })
  soTiet: number;
}

export type MonHocDocument = MonHoc & Document;
export const MonHocSchema = SchemaFactory.createForClass(MonHoc);
