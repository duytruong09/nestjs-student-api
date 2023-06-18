import { PartialType } from '@nestjs/mapped-types';
import CreateSinhVienDto from './create-sinhvien.dto';

export default class UpdateSinhVienDto extends PartialType(
  CreateSinhVienDto,
) {}
