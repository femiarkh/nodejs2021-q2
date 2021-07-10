import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, ObjectID, Repository } from 'typeorm';
import { User } from './models/user.entity';
import { UserUpdateDto } from './models/user-update.dto';
import { UserCreateDto } from './models/user-create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(data: UserCreateDto): Promise<User> {
    return this.userRepository.save(data);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return user;
  }

  async findByCondition(condition: {
    [key: string]: string | number;
  }): Promise<User[]> {
    const users = await this.userRepository.find({ where: condition });
    return users;
  }

  async update(id: string, data: UserUpdateDto): Promise<any> {
    return this.userRepository.update(id, data);
  }

  async delete(id: string): Promise<any> {
    return this.userRepository.delete(id);
  }
}
