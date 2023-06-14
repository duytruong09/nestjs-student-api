import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import aqp from 'api-query-params';
import AqpDto from '@interceptor/aqp/aqp.dto';
import { validatorDto } from './aqp.validator';

@Injectable()
export default class AQPMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Remove key query projection by key: "fields" in API-Query-Params
    if (
      req.query.fields
      && (req.query.fields as string).includes('password')
    ) {
      throw new BadRequestException('Fields cannot access passwords');
    }

    // caster function
    const casters = {
      lowercase: (val: any) => val.toLowerCase(),
      uppercase: (val: any) => val.toUppperCase(),
      int: (val: any) => parseInt(val, 10),
      boolean: (val: any) => (val === 'true' ? '1' : '0'),
    };

    // Convert req.query to api-query-params
    const query: any = aqp(req.query, { skipKey: 'page', blacklist: [], casters });

    // Validate params
    try {
      await validatorDto(AqpDto, query);
    } catch (e) {
      next(e);
    }

    // @ts-ignore
    req.aqp = query;
    next();
  }
}
