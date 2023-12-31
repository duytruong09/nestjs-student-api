import { MethodRouteEnum } from '@enum/method-route.enum';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreatehistoryDto {
  @IsNotEmpty()
  @IsMongoId()
  idUser: string;

  @IsOptional()
  @IsEnum(MethodRouteEnum)
  method: MethodRouteEnum;

  @IsNotEmpty()
  @IsString()
  url: string;
}
