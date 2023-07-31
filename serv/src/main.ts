import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  
  console.log(String(process.env.CLIENT_URL))
  app.enableCors({ origin: String(process.env.CLIENT_URL), credentials: true });

  const swagger = new DocumentBuilder()
      .setTitle('diplom')
      .setDescription('documentation')
      .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`Server started on port:${PORT}`));
}

start();