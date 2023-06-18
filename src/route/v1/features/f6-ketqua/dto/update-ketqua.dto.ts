import { PartialType } from '@nestjs/mapped-types';
import CreateKetQuaDto from './create-ketqua.dto';

export default class UpdateKetQuaDto extends PartialType(
  CreateKetQuaDto,
) {}
