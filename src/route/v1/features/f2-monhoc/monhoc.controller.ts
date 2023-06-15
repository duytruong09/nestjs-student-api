import { Types } from 'mongoose';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';
import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import { ApiTags } from '@nestjs/swagger';
import MonHocService from './monhoc.service';
import CreateMonHocDto from './dto/create-monhoc.dto';

@ApiTags('MonHocs')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class MonHocController {
  constructor(
    private readonly monhocService: MonHocService,
  ) { }

  /**
   * findAll
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    return this.monhocService.findManyBy(query);
  }

  /**
   * create
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateMonHocDto): Promise<any> {
    return this.monhocService.create(body);
  }
}
