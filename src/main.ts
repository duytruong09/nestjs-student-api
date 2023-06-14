// registers aliases, DON'T REMOVE THIS LINE!
import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import commonConstants from '@constant/common.constants';
import { ShareFunction } from '@helper/static-function';
import AllExceptionsFilter from '@filter/all-exceptions.filter';
import ValidationExceptions from '@exception/validation.exceptions';

import AppModule from './route/app/app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter()
  // );

  // enableCors
  app.enableCors();

  // Validation pipe in global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => new ValidationExceptions(errors),
    }),
  );

  // Catch all Exceptions
  app.useGlobalFilters(new AllExceptionsFilter());

  // morgan logger
  app.use(
    morgan(
      process.env.NODE_ENV === 'production'
        ? ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
        : ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
    ),
  );

  // socket peerjs
  // {
  //   const peerConfig = { debug: true } as any;
  //   const peerServer = ExpressPeerServer(app.getHttpServer(), peerConfig);
  //   app.use('/peerjs', peerServer);
  // }

  // set public file
  if (!ShareFunction.checkIsConfigS3Storage()) {
    // for Express
    app.useStaticAssets(path.join(__dirname, '..', 'public'), {
      prefix: '/static/',
    });

    // for Fastly
    // app.useStaticAssets({ root: path.join(__dirname, '..', 'public'), prefix: '/static/' });
  }

  // check config redis for socket
  // if (
  //   ShareFunction.isConfigRedis()
  //   && ShareFunction.isConfigWebsocket()
  //   && ShareFunction.isEnableWebsocket()
  // ) {
  //   const redisIoAdapter = new RedisIoAdapter(app);
  //   await redisIoAdapter.connectToRedis();
  //   app.useWebSocketAdapter(redisIoAdapter);
  // }

  // get port app running
  const port = process.env.SERVER_PORT || commonConstants.server.port;

  // config swagger
  const options = new DocumentBuilder()
    .setDescription('The boilerplate API for nestjs devs')
    .setVersion('1.0')
    .addBearerAuth({
      in: 'header',
      type: 'http',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);

  if (ShareFunction.isEnableSwagger()) {
    SwaggerModule.setup('api', app, document);
  }

  // Protected routes with roles guard
  // const rolesGuard = app.get<RolesGuard>(RolesGuard);
  // app.useGlobalGuards(rolesGuard);

  // run app
  await app.listen(port, async () => {
    console.log(
      `The server is running on ${port} port: http://${commonConstants.server.ip}:${port}/api`,
    );
  });

  // const httpAdapter = app.getHttpAdapter();
  // const router = httpAdapter.getInstance()._router;

  // await app.get<GroupDetailService>(GroupDetailService).seed(router);
  // await app.get<GroupApiService>(GroupApiService).seed(router);
  // await app.get<UserService>(UserService).seedAdminAndResetAuthorization(router);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
