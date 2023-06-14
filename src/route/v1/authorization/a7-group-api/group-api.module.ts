import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GroupApi, GroupApiSchema } from './schemas/group-api.schema';

import GroupApiController from './group-api.controller';
import GroupApiService from './group-api.service';
import GroupApiRepository from './group-api.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GroupApi.name,
        schema: GroupApiSchema,
      },
    ]),
  ],
  controllers: [GroupApiController],
  providers: [GroupApiService, GroupApiRepository],
  exports: [GroupApiService, GroupApiRepository],
})
export default class GroupApiModule {}
