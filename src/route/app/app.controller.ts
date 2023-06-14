import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { routerHelper } from '@helper/router.helper';

import AppService from './app.service';

@ApiTags('Welcome')
@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  sayHello(): string {
    return this.appService.sayHello();
  }
}
