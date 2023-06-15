import {
  IsDate, IsNotEmpty, IsNumber, IsString,
} from 'class-validator';

export default class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  readonly hoTen: string;

  @IsNotEmpty()
  readonly ngaySinh: Date;

  @IsNotEmpty()
  @IsString()
  readonly nu: string;

  @IsNotEmpty()
  @IsString()
  readonly maLop: string;

  @IsNumber()
  readonly hocBong: number;

  @IsString()
  readonly tinh: string;
}
