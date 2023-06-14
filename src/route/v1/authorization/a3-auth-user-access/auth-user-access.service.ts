import { Injectable } from '@nestjs/common';

import CustomLoggerService from '@lazy-module/logger/logger.service';
import BaseService from '@base-inherit/base.service';
import { MethodRouteEnum } from '@enum/method-route.enum';
import AuthUserAccessRepository from './auth-user-access.repository';
import { AuthUserAccessDocument } from './schemas/auth-user-access.schema';

@Injectable()
export default class AuthUserAccessService extends BaseService<AuthUserAccessDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly endpointAPIRepository: AuthUserAccessRepository,
  ) {
    super(logger, endpointAPIRepository);
  }
}
