import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrackingIdInterceptor } from './interceptors/tracking.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TrackingIdInterceptor());
  await app.listen(process.env.PORT ?? 3000);

  console.log(`server running in ${await app.getUrl()} !!!`);
}
bootstrap();
