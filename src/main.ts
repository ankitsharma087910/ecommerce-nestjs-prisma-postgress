import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   const documentBuilder = new DocumentBuilder()
      .setTitle('Plankaroo Api Documentation')
      .setDescription('API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup('app', app, document);
  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
