import { Global, Module } from '@nestjs/common';
import TokenService from '@common/c1-auth/token.service';
import WebsocketCustomService from './websocket-custom.service';
import WebsocketCustomGateway from './websocket-custom.gateway';

@Global()
@Module({
  imports: [],
  providers: [WebsocketCustomService, WebsocketCustomGateway, TokenService],
  exports: [WebsocketCustomService],
})
export default class WebsocketCustomModule {}
