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
import UpdateSpecializeDto from '@features/f1-specialize/dto/update-specialize.dto';
import SinhVienService from './sinhvien.service';
import CreateSinhVienDto from './dto/create-sinhvien.dto';

@ApiTags('SinhViens')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class SinhVienController {
  constructor(private readonly sinhvienService: SinhVienService) {}

  /**
   * findAll
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    return this.sinhvienService.findManyBy(query);
  }

  /**
   * create
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateSinhVienDto): Promise<any> {
    return this.sinhvienService.create(body);
  }

  /**
   * update
   * @param id
   * @param body
   * @returns
   */
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateSpecializeDto,
  ): Promise<any> {
    return this.sinhvienService.updateOneById(id, body);
  }

  /**
   * Delete hard many by ids
   * @param ids
   * @returns
   */
  @Delete(':ids/ids')
  // @HttpCode(204)
  async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
    return this.sinhvienService.deleteManyHardByIds(
      ids.split(',').map((item: any) => new Types.ObjectId(item)),
    );
  }

  /**
   * Delete
   * @param id
   * @returns
   */
  @Delete(':id')
  // @HttpCode(204)
  async delete(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    return this.sinhvienService.deleteOneHardById(id);
  }

  /**
   * paginate
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    return this.sinhvienService.paginate(query); // return {results: [], limit, page, ....}
  }

  /**
   * findOneById
   * @param id
   * @returns
   */
  @Get(':id')
  @HttpCode(200)
  async findOneById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @ApiQueryParams('population') populate: AqpDto,
  ): Promise<any> {
    const result = await this.sinhvienService.findOneById(id, { populate });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
