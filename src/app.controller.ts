import { Controller, Get } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './resources/user/user.service';
import 'dotenv/config';
import { User } from './resources/user/models/user.entity';

@Controller()
export class AppController {
  constructor(private userService: UserService) {
    this.createAdmin();
  }

  @Get()
  async createAdmin(): Promise<User> {
    const admins = await this.userService.findByCondition({
      login: `${process.env.ADMIN_NAME}`,
    });
    if (admins.length) {
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
