import { PartialType } from '@nestjs/mapped-types';
import CreateLopDto from './create-lop.dto';

export default class UpdateLopDto extends PartialType(
  CreateLopDto,
) {}
