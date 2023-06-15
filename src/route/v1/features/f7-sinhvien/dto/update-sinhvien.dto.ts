import { PartialType } from '@nestjs/mapped-types';
import CreateStudentDto from './create-sinhvien.dto';

export default class UpdateStudentDto extends PartialType(
  CreateStudentDto,
) {}
