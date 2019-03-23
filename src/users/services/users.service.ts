import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async createUser(user): Promise<User> {
    const newUser = new User();
    user.name = user.name;
    user.password = user.password;

    return this.userRepository.save(user);
  }

  async findOneById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}