import {
  IsDate, IsNotEmpty, IsNumber, IsString,
} from 'class-validator';

export default class CreateKetQuaDto {
  @IsNotEmpty()
  @IsString()
  readonly maSV: string;

  @IsNotEmpty()
  @IsString()
  readonly maMH: string;

  @IsNumber()
  readonly diemThi: number;
}
