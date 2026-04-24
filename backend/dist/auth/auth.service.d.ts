import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(email: string, pass: string): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
}
