import { IsISO8601, IsNotEmpty, IsUUID } from "class-validator";

export class CreateAppointmentDto {
  @IsISO8601({}, { message: "Data/hora inválida." })
  @IsNotEmpty({ message: "A data é obrigatória." })
  date: string;

  @IsUUID(undefined, { message: "Serviço inválido." })
  @IsNotEmpty({ message: "O serviço é obrigatório." })
  serviceId: string;

  @IsUUID(undefined, { message: "Cliente inválido." })
  @IsNotEmpty({ message: "ID do cliente não informado." })
  clientId: string;
}
