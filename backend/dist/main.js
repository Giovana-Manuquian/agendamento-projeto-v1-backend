"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOriginsEnv = process.env.CORS_ORIGINS;
    const corsOrigins = corsOriginsEnv
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean) ?? [];
    app.enableCors({
        origin: "https://agendamento-projeto-front-v2.vercel.app",
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const port = process.env.PORT ? Number(process.env.PORT) : 8080;
    await app.listen(port, "0.0.0.0");
    console.log(`🚀 Servidor rodando na porta: ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map