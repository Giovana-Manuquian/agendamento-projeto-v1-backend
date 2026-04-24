import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  // Cria a aplicação NestJS
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS
  const corsOriginsEnv = process.env.CORS_ORIGINS;
  const corsOrigins =
    corsOriginsEnv
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  app.enableCors({
    // Se houver origens definidas, usa elas; caso contrário, permite tudo (true)
    origin: corsOrigins.length ? corsOrigins : true, 
    credentials: true,
  });

  // Pipes Globais para validação de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /**
   * CONFIGURAÇÃO DE PORTA E HOST PARA DEPLOY (RAILWAY)
   * O Railway exige que a aplicação escute em 0.0.0.0 e use a porta da variável de ambiente PORT.
   */
  const port = process.env.PORT || 8080; 

  // O host '0.0.0.0' é fundamental para que o tráfego externo chegue ao container
  await app.listen(port, '0.0.0.0'); 

  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}

bootstrap();