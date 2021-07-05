import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './models/user-create.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async all(): Promise<Partial<User>[]> {
    return (await this.userService.all()).map((user) => ({
      id: user.id,
      name: user.name,
      login: user.login,
    }));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: UserCreateDto): Promise<Partial<User>> {
    const { name, login, password } = body;
    const hashed = await bcrypt.hash(password, 10);
    const response = await this.userService.create({
      name,
      login,
      password: hashed,
    });
    return {
      id: response.id,
      name: response.name,
      login: response.login,
    };
  }
}
