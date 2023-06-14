import { Types } from 'mongoose';
import {
  Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UseInterceptors,
} from '@nestjs/common';

import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';
import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import { ApiTags } from '@nestjs/swagger';
import AqpDto from '@interceptor/aqp/aqp.dto';
import DashboardService from './dashboard.service';
import UpdateDashboardDto from './dto/update-dashboard.dto';
import CreateDashboardDto from './dto/create-dashboard.dto';

@ApiTags('dashboards')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   * findAll
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    const result = await this.dashboardService.findManyBy(query);
    return result;
  }

  /**
   * create
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateDashboardDto): Promise<any> {
    const result = await this.dashboardService.create(body);

    return result;
  }

  /**
   * update
   * @param id
   * @param body
   * @returns
   */
  @Put(':id')
  @HttpCode(200)
  async update(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Body() body: UpdateDashboardDto): Promise<any> {
    const result = await this.dashboardService.updateOneById(id, body);

    return result;
  }

  /**
   * Delete hard many by ids
   * @param ids
   * @returns
   */
  @Delete(':ids/ids')
  // @HttpCode(204)
  async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
    const _ids = ids.split(',').map((item: any) => new Types.ObjectId(item));
    const result = await this.dashboardService.deleteManyHardByIds(_ids);
    return result;
  }

  /**
   * Delete
   * @param id
   * @returns
   */
  @Delete(':id')
  // @HttpCode(204)
  async delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<any> {
    const result = await this.dashboardService.deleteOneHardById(id);

    return result;
  }

  /**
   * paginate
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: any): Promise<any> {
    const result = await this.dashboardService.paginate(query);

    return result;
  }

  /**
   * findOneById
   * @param id
   * @returns
   */
  @Get(':id')
  @HttpCode(200)
  async findOneById(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @ApiQueryParams('population') populate: AqpDto): Promise<any> {
    const result = await this.dashboardService.findOneById(id, { populate });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
