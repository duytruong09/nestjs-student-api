import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CallStatusDto {
  @IsOptional()
  @IsString()
  idQuestionAsker: String;

  @IsOptional()
  @IsString()
  idRespondent: String;

  @IsOptional()
  @IsString()
  idQuestion: String;

  @IsOptional()
  @IsString()
  caller: String;

  @IsOptional()
  @IsString()
  idRoom: String;

  @IsOptional()
  @IsNumber()
  expiryTime: Number;
}
