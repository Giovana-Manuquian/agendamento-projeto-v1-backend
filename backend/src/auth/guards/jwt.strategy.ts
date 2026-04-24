import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Pega o token do cabeçalho "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // A mesma chave que você usou no JwtModule para gerar o token
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // O NestJS chama essa função automaticamente se o token for válido
  async validate(payload: any) {
    // Retorna os dados que estarão disponíveis em req.user nos Controllers
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
