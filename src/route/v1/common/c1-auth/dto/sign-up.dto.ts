import CreateUserDto from '@authorization/a1-user/dto/create-user.dto';
import { TypeRegisterEnum } from '@authorization/a1-user/enum';
import { RoleUserEnum } from '@enum/role-user.enum';
import { PartialType } from '@nestjs/mapped-types';
import {
  MinLength,
  MaxLength,
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  Length, IsNumber, IsObject,
} from 'class-validator';

export default class SignupDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(128)
  readonly email: string;

  @IsOptional()
  @IsString()
  @MinLength(12)
  readonly deviceID: string;

  @IsString()
  @Length(6, 50)
  readonly password!: string;

  @IsEnum(TypeRegisterEnum)
  readonly typeRegister: TypeRegisterEnum = TypeRegisterEnum.EMAIL;

  @IsEnum(RoleUserEnum)
  role: RoleUserEnum = RoleUserEnum.customer;

  @IsNotEmpty()
  @Length(4)
  readonly otpCode: string;

  @IsOptional()
  @IsString()
  readonly identity: string;

  @IsOptional()
  @IsNumber()
  readonly dateOfCreatedId: number;

  @IsOptional()
  @IsString()
  readonly addressOfCreatedId: string;

  @IsOptional()
  @IsObject()
  locations: { lat: string, lng: string };
}
