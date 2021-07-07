import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './models/user-create.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserUpdateDto } from './models/user-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async all(): Promise<User[]> {
    return this.userService.all();
  }

  @Post()
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

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    await this.userService.update(id, body);
    return this.userService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
