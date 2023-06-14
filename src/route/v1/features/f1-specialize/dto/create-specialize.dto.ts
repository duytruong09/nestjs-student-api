import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateSpecializeDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly position: number;
}
