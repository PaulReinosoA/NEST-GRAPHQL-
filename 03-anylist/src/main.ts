import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TrackingIdInterceptor } from './interceptors/tracking.interceptor';
/*para la configuracion de carga y configuracion de modulo asycn del app.module*/
// import crypto from 'crypto';
// // Polyfill para que @nestjs/graphql encuentre crypto
// (global as any).crypto = crypto;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TrackingIdInterceptor());
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false//true, evita que personas manden mas info de la que espero
    }),
  );

  console.log(`server running in ${await app.getUrl()} !!!`);
}
bootstrap();
