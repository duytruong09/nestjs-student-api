import { IsNumber, IsOptional } from 'class-validator';

export class StatiticReviewDto {
  @IsOptional()
  @IsNumber()
  totalReputation?: number = 0;

  @IsOptional()
  @IsNumber()
  countReputation?: number = 0;

  @IsOptional()
  @IsNumber()
  totalRating?: number = 0;

  @IsOptional()
  @IsNumber()
  countRating?: number = 0;

  @IsOptional()
  @IsNumber()
  numberStatisfied?: number = 0;

  @IsOptional()
  @IsNumber()
  numberNotStatisfied?: number = 0;
}
