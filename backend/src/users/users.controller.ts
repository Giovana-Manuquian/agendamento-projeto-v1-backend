import { Controller, Post, Body, Get } from "@nestjs/common"; // Adicione o Get aqui
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // ADICIONE ESTE MÉTODO:
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
