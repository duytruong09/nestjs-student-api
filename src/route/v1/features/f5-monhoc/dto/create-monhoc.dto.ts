import {
  IsDate, IsNotEmpty, IsNumber, IsString,
} from 'class-validator';

export default class CreateMonHocDto {
  @IsNotEmpty()
  @IsString()
  readonly tenMH: string;

  @IsNotEmpty()
  @IsNumber()
  readonly soTiet: number;
}
