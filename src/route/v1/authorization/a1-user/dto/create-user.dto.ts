import { RoleUserEnum } from '@enum/role-user.enum';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNumber, IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { GenderEnum, TypeRegisterEnum } from '../enum';
import { CallStatusDto } from './call-status.dto';
import { CertificateDto } from './certificate.dto';
import { ExperienceDto } from './experience.dto';
import { StatiticReviewDto } from './statitic-reviews.dto';

export default class CreateUserDto {
  @IsOptional()
  @IsEnum(RoleUserEnum)
  readonly role: string;

  @ValidateIf((o) => o.role === RoleUserEnum.manager)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly groups: string[];

  @ValidateIf((o) => o.role === RoleUserEnum.manager)
  @IsOptional()
  @IsArray()
  readonly groupDetails: any[];

  @ValidateIf((o) => o.role === RoleUserEnum.manager)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly groupAPIAccesses: string[];

  @ValidateIf((o) => o.role === RoleUserEnum.manager)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly groupAPIDenines: string[];

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  @Length(6, 50)
  readonly password?: string;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsEnum(TypeRegisterEnum)
  readonly typeRegister: TypeRegisterEnum;

  @IsOptional()
  @IsString()
  readonly tokenLogin: string;

  @IsOptional()
  @IsString()
  readonly deviceID: string;

  @IsOptional()
  @IsString()
  readonly enableFCM: boolean;

  @IsOptional()
  @IsString()
  readonly avatar: string;

  @IsOptional()
  @IsString()
  readonly fullName: string;

  @IsOptional()
  @IsNumber()
  readonly born: number;

  @IsOptional()
  @IsEnum(GenderEnum)
  readonly gender: GenderEnum;

  @IsOptional()
  @IsString()
  readonly address: string;

  @IsOptional()
  @IsMongoId()
  readonly idProvince: string;

  @IsOptional()
  @IsString()
  readonly nation: string;

  @IsOptional()
  @IsString()
  readonly job: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  readonly experiences: ExperienceDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly capacity: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly myAlbum: string[];

  @IsOptional()
  @IsString()
  readonly bankName: string;

  @IsOptional()
  @IsString()
  readonly branchName: string;

  @IsOptional()
  @IsString()
  readonly bankAccountNumber: string;

  @IsOptional()
  @IsString()
  readonly bankAccountName: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateDto)
  readonly certificates: CertificateDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => StatiticReviewDto)
  statiticReview: StatiticReviewDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CallStatusDto)
  callStatus: CallStatusDto;

  @IsOptional()
  @IsString()
  readonly identity: string;

  @IsOptional()
  @IsNumber()
  readonly dateOfCreatedId: number;

  @IsOptional()
  @IsString()
  readonly addressOfCreatedId: string;

  @IsOptional()
  @IsObject()
  locations: { lat: string, lng: string };
}
