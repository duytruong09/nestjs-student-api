import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GroupDetail, GroupDetailSchema } from './schemas/group-detail.schema';

import GroupDetailController from './group-detail.controller';
import GroupDetailService from './group-detail.service';
import GroupDetailRepository from './group-detail.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GroupDetail.name,
        schema: GroupDetailSchema,
      },
    ]),
  ],
  controllers: [GroupDetailController],
  providers: [GroupDetailService, GroupDetailRepository],
  exports: [GroupDetailService, GroupDetailRepository],
})
export default class GroupDetailModule {}
