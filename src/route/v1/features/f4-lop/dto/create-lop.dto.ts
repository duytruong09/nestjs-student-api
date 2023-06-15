import {
  IsDate, IsNotEmpty, IsNumber, IsString,
} from 'class-validator';

export default class CreateLopDto {
  @IsNotEmpty()
  @IsString()
  readonly tenLop: string;

  @IsNotEmpty()
  @IsString()
  readonly maKhoa: string;
}
