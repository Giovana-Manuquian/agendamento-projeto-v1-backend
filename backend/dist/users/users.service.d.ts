import { PrismaService } from "../prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        specialty: string;
    }[]>;
}
