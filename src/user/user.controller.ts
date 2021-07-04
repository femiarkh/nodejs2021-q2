import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async all(): Promise<User[]> {
    return this.userService.all();
  }

  @Post()
  async create(@Body() body) {
    const { name, login, password } = body;
    const hashed = await bcrypt.hash(password, 10);
    return this.userService.create({
      name,
      login,
      password: hashed,
    });
  }
}
