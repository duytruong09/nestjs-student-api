import { PartialType } from '@nestjs/mapped-types';
import {
  IsMongoId, IsOptional, IsNotEmpty, IsString, IsNumber,
} from 'class-validator';
import CreateKhoaDto from './create-khoa.dto';

export default class KhoaResponseDto extends PartialType(
  CreateKhoaDto,
) {
  @IsMongoId()
  _id: string;
}
