import { PartialType } from '@nestjs/mapped-types';
import CreateKhoaDto from './create-khoa.dto';

export default class UpdateKhoaDto extends PartialType(
  CreateKhoaDto,
) {}
