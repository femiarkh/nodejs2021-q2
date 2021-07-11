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
import * as bcrypt from 'bcrypt';
import { DeleteResult } from 'typeorm';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/user-update.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TaskService } from 'src/task/task.service';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private taskService: TaskService,
  ) {}

  @Get()
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
  async get(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UserUpdateDto,
  ): Promise<User> {
    await this.userService.update(id, body);
    return this.userService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    const tasks = await this.taskService.findByCondition({ userId: id });
    await Promise.all(
      tasks.map((task) =>
        this.taskService.update(task.boardId, task.id, {
          ...task,
          userId: null,
        }),
      ),
    );
    return this.userService.delete(id);
  }
}
