import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthUserId, AuthUserIdSchema } from './schemas/auth-user-id.schema';
import AuthUserIdController from './auth-user-id.controller';
import AuthUserIdService from './auth-user-id.service';
import AuthUserIdRepository from './auth-user-id.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthUserId.name,
        schema: AuthUserIdSchema,
      },
    ]),
  ],
  controllers: [AuthUserIdController],
  providers: [AuthUserIdService, AuthUserIdRepository],
  exports: [AuthUserIdService, AuthUserIdRepository],
})
export default class AuthUserIdModule {}
