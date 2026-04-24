import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma.service"; // Ajuste o caminho conforme seu projeto
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    // 1. Busca o usuário pelo email
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException("Email ou senha incorretos");
    }

    // 2. Compara a senha digitada com o hash salvo no banco
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Email ou senha incorretos");
    }

    // 3. Monta o pacote de dados do Token
    const payload = { sub: user.id, email: user.email, role: user.role };

    // 4. Retorna o token e os dados básicos para o frontend Next.js redirecionar
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        role: user.role, // Aqui o Next.js vai saber se manda pro Dashboard ou pra Home!
      },
    };
  }
}
