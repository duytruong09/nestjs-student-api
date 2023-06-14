import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsMongoId, IsOptional } from 'class-validator';
import CreateSpecializeDto from './create-specialize.dto';

export default class SpecializeResponseDto extends PartialType(
  CreateSpecializeDto,
) {
  @IsMongoId()
  _id: string;

  @IsOptional()
  @IsArray()
  subSpecializes: any = [];
}
