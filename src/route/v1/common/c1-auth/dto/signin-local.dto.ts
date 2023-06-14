import { TypeRegisterEnum } from '@authorization/a1-user/enum';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export default class SigninLocalDto {
  @IsOptional()
  @IsEnum(TypeRegisterEnum)
  typeRegister: TypeRegisterEnum;

  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  readonly deviceID?: string;
}
