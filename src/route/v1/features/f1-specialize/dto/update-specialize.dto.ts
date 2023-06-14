import { PartialType } from '@nestjs/mapped-types';
import CreateSpecializeDto from './create-specialize.dto';

export default class UpdateSpecializeDto extends PartialType(
  CreateSpecializeDto,
) {}
