import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AuthUserAccess,
  AuthUserAccessSchema,
} from './schemas/auth-user-access.schema';

import AuthUserAccessController from './auth-user-access.controller';
import AuthUserAccessService from './auth-user-access.service';
import AuthUserAccessRepository from './auth-user-access.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthUserAccess.name,
        schema: AuthUserAccessSchema,
      },
    ]),
  ],
  controllers: [AuthUserAccessController],
  providers: [AuthUserAccessService, AuthUserAccessRepository],
  exports: [AuthUserAccessService, AuthUserAccessRepository],
})
export default class AuthUserAccessModule {}
