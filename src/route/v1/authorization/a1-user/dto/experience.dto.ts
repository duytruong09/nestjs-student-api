import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ExperienceDto {
  @IsOptional()
  @IsString()
  fieldName: string;

  @IsOptional()
  @IsNumber()
  year: number;
}
