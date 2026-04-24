import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common"; // <-- Import adicionado aqui!
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOriginsEnv = process.env.CORS_ORIGINS;
  const corsOrigins =
    corsOriginsEnv
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  app.enableCors({
    // url de teste para desenvolvimento local
    // origin: true, 
    origin: "https://agendamento-projeto-front-v2.vercel.app",
    // origin: corsOrigins.length ? corsOrigins : true,
    credentials: true,
  });

  // As validações devem ser configuradas ANTES do app.listen
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Use Number para garantir que seja um valor numérico
  const port = process.env.PORT ? Number(process.env.PORT) : 8080;

  // O host '0.0.0.0' é obrigatório para o Railway expor o serviço
  await app.listen(port, "0.0.0.0");
  console.log(`🚀 Servidor rodando na porta: ${port}`);
}
bootstrap();
