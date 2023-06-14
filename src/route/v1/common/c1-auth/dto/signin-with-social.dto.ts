import CreateUserDto from '@authorization/a1-user/dto/create-user.dto';
import { TypeRegisterEnum } from '@authorization/a1-user/enum';
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export default class SigninWithSocialDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsEnum(TypeRegisterEnum)
  typeRegister: TypeRegisterEnum;

  @IsNotEmpty()
  @IsString()
  tokenLogin: string;
}
