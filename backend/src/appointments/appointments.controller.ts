import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
} from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard) // Protege a rota: só logado cria agendamento
  @Post()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Request() req,
  ) {
    // Pegamos o ID do usuário logado direto do Token (injetado pelo JwtStrategy)
    const userId = req.user.userId;

    // Passamos o ID do usuário para o service criar o vínculo no banco
    return this.appointmentsService.create({
      ...createAppointmentDto,
      clientId: userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get("my-appointments")
  async findMy(@Request() req) {
    // Rota para o cliente ver os agendamentos dele
    return this.appointmentsService.findByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req, @Query('serviceId') serviceId?: string) {
    return this.appointmentsService.findAll(serviceId);
  }
}
