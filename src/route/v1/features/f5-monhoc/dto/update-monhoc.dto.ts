import { PartialType } from '@nestjs/mapped-types';
import CreateMonHocDto from './create-monhoc.dto';

export default class UpdateMonHocDto extends PartialType(
  CreateMonHocDto,
) {}
