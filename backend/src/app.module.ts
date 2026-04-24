import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ServicesModule } from "./services/services.module";
import { AppointmentsModule } from "./appointments/appointments.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [UsersModule, ServicesModule, AppointmentsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
