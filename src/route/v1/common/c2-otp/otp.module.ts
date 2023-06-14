import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import MailerModule from '@lazy-module/mailer/mailer.module';
import { OtpSchema, Otp } from './schemas/otp.schema';

import OtpController from './otp.controller';
import OtpService from './otp.service';
import OtpRepository from './otp.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Otp.name,
        schema: OtpSchema,
      },
    ]),
    MailerModule,
  ],
  controllers: [OtpController],
  providers: [OtpService, OtpRepository],
  exports: [OtpService, OtpRepository],
})
export default class OtpModule {}
