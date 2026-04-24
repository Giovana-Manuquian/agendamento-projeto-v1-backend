import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
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
    // Isso permite que você use tanto a URL principal quanto as de teste do Vercel
    origin: corsOrigins.length ? corsOrigins : true, 
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // No seu main.ts, altere estas linhas:
const port = process.env.PORT || 8080; 

// Remova o "0.0.0.0" se o erro persistir, 
// mas para o Railway, o ideal é manter ou deixar apenas a porta.
await app.listen(port, '0.0.0.0'); 

console.log(`Application is running on: ${await app.getUrl()}`);
}
