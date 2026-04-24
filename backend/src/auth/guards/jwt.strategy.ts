import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) { // Injete o serviço aqui
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Use o get() do configService em vez de process.env
      secretOrKey: configService.get<string>('JWT_SECRET'), 
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
