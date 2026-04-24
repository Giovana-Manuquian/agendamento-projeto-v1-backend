import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // 1. Verificar se o e-mail já existe
    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      throw new BadRequestException("Este e-mail já está cadastrado.");
    }

    // 2. Criptografar a senha
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // 3. Salvar no banco
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      select: {
        // Retorna tudo menos a senha por segurança
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: { role: "PROVIDER" }, // Alinhado com o que o seu frontend (TeamSection) precisa
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        specialty: true,
      },
    });
  }
}
