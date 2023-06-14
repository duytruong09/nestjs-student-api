import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class BackupData {
  @Prop({ type: String, required: true })
  path: string;
}

export type BackupDataDocument = BackupData & Document;
export const BackupDataSchema = SchemaFactory.createForClass(BackupData);
