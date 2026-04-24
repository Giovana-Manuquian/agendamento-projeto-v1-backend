import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config"; // 1. Adicione esta linha aqui nos imports
import { UsersModule } from "./users/users.module";
import { ServicesModule } from "./services/services.module";
import { AppointmentsModule } from "./appointments/appointments.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 2. Adicione esta linha aqui dentro do array
    UsersModule, 
    ServicesModule, 
    AppointmentsModule, 
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}