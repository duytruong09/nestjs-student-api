import {
  IsString, IsNotEmpty, Length, IsEmail,
} from 'class-validator';

export class UpdatePasswordByEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  readonly password!: string;

  @IsNotEmpty()
  @Length(4)
  readonly otpCode: string;
}
