import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserUpdateDto } from './models/user-update.dto';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(data): Promise<User> {
    return this.userRepository.save(data);
  }

  async findOne(condition): Promise<User> {
    const user = await this.userRepository.findOne(condition);
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return user;
  }

  async update(id: number, data: UserUpdateDto): Promise<any> {
    return this.userRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }
}
