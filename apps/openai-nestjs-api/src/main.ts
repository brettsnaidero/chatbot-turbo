import { NestFactory } from '@nestjs/core';
import { ChatModule } from './api/chat/chat.module';
// import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(ChatModule);
  await app.listen(4040);
}
bootstrap();
