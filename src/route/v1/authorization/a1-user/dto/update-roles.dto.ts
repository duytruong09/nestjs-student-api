import { MethodRouteEnum } from '@enum/method-route.enum';
import { RoleUserEnum } from '@enum/role-user.enum';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { GroupDetaiType } from '../types/group-detail.type';
import { GroupDetailDto } from './group-detail.dto';

export class updateRolesDto {
  @IsOptional()
  @IsEnum(RoleUserEnum)
  role: RoleUserEnum;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groups: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupDetailDto)
  groupDetails: GroupDetaiType[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groupAPIAccesses: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groupAPIDenines: string[];
}
