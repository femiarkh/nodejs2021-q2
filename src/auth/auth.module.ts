import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import 'dotenv/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
