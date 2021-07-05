import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './models/user-create.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async all(): Promise<User[]> {
    return this.userService.all();
  }

  @Post()
  async create(@Body() body: UserCreateDto) {
    const { name, login, password } = body;
    const hashed = await bcrypt.hash(password, 10);
    const response = await this.userService.create({
      name,
      login,
      password: hashed,
    });
    return {
      name: response.name,
      login: response.login,
      id: response.id,
    };
  }
}
