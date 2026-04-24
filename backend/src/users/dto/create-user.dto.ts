import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString()
  @MinLength(4, { message: 'A senha deve ter pelo menos 4 caracteres' })
  password: string;

  @IsOptional()
  @IsString()
  role?: "CLIENT" | "PROVIDER";

  @IsOptional()
  @IsString()
  specialty?: string;
}