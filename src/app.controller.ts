import { Controller, Get } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import 'dotenv/config';
import { User } from './user/models/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
  ) {
    this.createAdmin();
  }

  @Get()
  async createAdmin(): Promise<User> {
    const admin = await this.userService.findOne({
      login: `${process.env.ADMIN_NAME}`,
    });
    if (admin) {
      return;
    }
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    this.userService.create({
      name: process.env.ADMIN_NAME,
      login: process.env.ADMIN_LOGIN,
      password: hashed,
    });
  }
}
