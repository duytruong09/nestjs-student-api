import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import { AuthUserId, AuthUserIdDocument } from './schemas/auth-user-id.schema';

@Injectable()
export default class AuthUserIdRepository extends BaseRepository<AuthUserIdDocument> {
  constructor(
    @InjectModel(AuthUserId.name)
      authUserIdModel: PaginateModel<AuthUserIdDocument>,
  ) {
    super(authUserIdModel);
  }
}
