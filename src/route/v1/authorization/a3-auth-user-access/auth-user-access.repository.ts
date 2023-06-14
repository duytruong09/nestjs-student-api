import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import BaseRepository from '@base-inherit/base.repository';
import {
  AuthUserAccess,
  AuthUserAccessDocument,
} from './schemas/auth-user-access.schema';

@Injectable()
export default class AuthUserAccessRepository extends BaseRepository<AuthUserAccessDocument> {
  constructor(
    @InjectModel(AuthUserAccess.name)
      authUserAccessModel: PaginateModel<AuthUserAccessDocument>,
  ) {
    super(authUserAccessModel);
  }
}
