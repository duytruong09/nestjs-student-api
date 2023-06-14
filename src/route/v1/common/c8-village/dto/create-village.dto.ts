import { Types } from 'mongoose';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export default class CreateVillageDto {
  @IsOptional()
  @IsMongoId()
  readonly idProvince: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  readonly idDistrict: Types.ObjectId;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly slug: string;
}
