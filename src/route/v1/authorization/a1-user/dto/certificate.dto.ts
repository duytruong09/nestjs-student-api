import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { CertificateStatusEnum } from '../enum';

export class CertificateDto {
  @IsNotEmpty()
  @IsMongoId()
  idCertificate: string;

  @IsNumber()
  @IsOptional()
  numberTest: number;

  @IsOptional()
  @IsEnum(CertificateStatusEnum)
  status: CertificateStatusEnum;
}
