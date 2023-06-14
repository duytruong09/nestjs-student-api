import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Specialize {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Number, default: 0 })
  position: number;
}

export type SpecializeDocument = Specialize & Document;
export const SpecializeSchema = SchemaFactory.createForClass(Specialize);
