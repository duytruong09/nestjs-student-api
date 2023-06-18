import { PartialType } from '@nestjs/mapped-types';
import {
  IsMongoId, IsOptional, IsNotEmpty, IsString, IsNumber,
} from 'class-validator';
import CreateKetQuaDto from './create-ketqua.dto';

export default class KetQuaResponseDto extends PartialType(
  CreateKetQuaDto,
) {
  @IsMongoId()
  _id: string;
}
