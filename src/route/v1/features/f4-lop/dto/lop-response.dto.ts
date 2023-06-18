import { PartialType } from '@nestjs/mapped-types';
import {
  IsMongoId, IsOptional, IsNotEmpty, IsString, IsNumber,
} from 'class-validator';
import CreateLopDto from './create-lop.dto';

export default class LopResponseDto extends PartialType(
  CreateLopDto,
) {
  @IsMongoId()
  _id: string;
}
