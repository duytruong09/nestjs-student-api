import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import { Group, GroupDocument } from './schemas/group.schema';

@Injectable()
export default class GroupRepository extends BaseRepository<GroupDocument> {
  constructor(
    @InjectModel(Group.name)
      groupModel: PaginateModel<GroupDocument>,
  ) {
    super(groupModel);
  }
}
