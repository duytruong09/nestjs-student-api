import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import CreateProvinceDto from './create-province.dto';

export default class UpdateProvinceDto extends PartialType(CreateProvinceDto) {}
