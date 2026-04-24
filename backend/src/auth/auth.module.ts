import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport"; // Adicionado
import { PrismaService } from "../prisma.service";
import { JwtStrategy } from "../auth/guards/jwt.strategy";
@Module({
  imports: [
    PassportModule, // Adicionado para gerenciar estratégias de autenticação
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy, // Registrado como provider para o NestJS encontrá-lo
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
