import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import OtpModule from '@common/c2-otp/otp.module';
import { UserSchema, User } from './schemas/user.schema';

import UserController from './user.controller';
import UserService from './user.service';
import UserRepository from './user.repository';
import FcmUserService from './fcm/fcm-user.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    OtpModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, FcmUserService],
  exports: [UserService, UserRepository, FcmUserService],
})
export default class UserModule {}
