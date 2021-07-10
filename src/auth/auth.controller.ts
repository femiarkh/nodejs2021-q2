import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Controller()
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    const users = await this.userService.findByCondition({ login });

    if (!users.length) {
      throw new ForbiddenException('User not found');
    }

    const user = users[0];

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({
      userId: user.id,
      login: user.login,
    });

    return {
      token: jwt,
    };
  }
}
