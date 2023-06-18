import { PartialType } from '@nestjs/mapped-types';
import {
  IsMongoId, IsOptional, IsNotEmpty, IsString, IsNumber,
} from 'class-validator';
import CreateSinhVienDto from './create-sinhvien.dto';

export default class SinhVienResponseDto extends PartialType(
  CreateSinhVienDto,
) {
  @IsMongoId()
  _id: string;
}
