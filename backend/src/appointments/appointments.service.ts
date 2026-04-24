import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAppointmentDto) {
    const appointmentDate = new Date(data.date);

    // 1. Buscar detalhes do serviço para saber a duração
    const service = await this.prisma.service.findUnique({
      where: { id: data.serviceId },
    });

    if (!service) {
      throw new BadRequestException("Serviço não encontrado.");
    }

    // 2. Calcular o horário de término do novo agendamento
    const endTime = new Date(
      appointmentDate.getTime() + service.duration * 60000,
    );

    // 3. Validação: Verificar se já existe agendamento que sobreponha este horário
    const conflict = await this.prisma.appointment.findFirst({
      where: {
        serviceId: data.serviceId,
        AND: [
          { date: { lt: endTime } },
          {
            date: {
              gt: new Date(
                appointmentDate.getTime() - service.duration * 60000,
              ),
            },
          },
        ],
      },
    });

    if (conflict) {
      throw new BadRequestException(
        "Este horário já está ocupado para este serviço.",
      );
    }

    // 4. Criar o agendamento conectado ao CLIENTE oficial no banco
    return this.prisma.appointment.create({
      data: {
        date: appointmentDate,
        status: "PENDING",
        service: { connect: { id: data.serviceId } },
        client: { connect: { id: data.clientId } }, // <-- Substituímos texto solto pela relação real
      },
    });
  }

  // NOVO MÉTODO: Busca agendamentos de um usuário específico
  async findByUser(userId: string) {
    return this.prisma.appointment.findMany({
      where: { clientId: userId },
      include: {
        service: { include: { user: true } }, // Traz o serviço e o profissional
      },
      orderBy: { date: "asc" },
    });
  }

  async findAll(serviceId?: string) {
    return this.prisma.appointment.findMany({
      where: {
        ...(serviceId ? { serviceId } : {}),
      },
      include: {
        service: { include: { user: true } },
        client: { select: { id: true, name: true, email: true } }, // <-- Agora o painel do profissional pode ver o nome do cliente
      },
      orderBy: { date: "asc" },
    });
  }

  async findOne(id: string) {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: { service: true, client: true },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.appointment.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
