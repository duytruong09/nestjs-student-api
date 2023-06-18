import { PartialType } from '@nestjs/mapped-types';
import {
  IsMongoId, IsOptional, IsNotEmpty, IsString, IsNumber,
} from 'class-validator';
import CreateMonHocDto from './create-monhoc.dto';

export default class MonHocResponseDto extends PartialType(
  CreateMonHocDto,
) {
  @IsMongoId()
  _id: string;
}
