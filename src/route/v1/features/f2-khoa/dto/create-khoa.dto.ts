import {
  IsDate, IsNotEmpty, IsNumber, IsString,
} from 'class-validator';

export default class CreateKhoaDto {
  @IsNotEmpty()
  @IsString()
  readonly tenKhoa: string;

  @IsNotEmpty()
  @IsNumber()
  readonly soCBGD: number;
}
