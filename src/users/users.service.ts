/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email: email });
  }

  async saveUser(user: User): Promise<any> {
    try {
      await this.usersRepository.save(this.usersRepository.create(user));
    } catch (e) {
      console.log(e);
      return null;
    }
    return true;
  }

  async deleteUser(email: string): Promise<any> {
    try {
      await this.usersRepository.delete({ email: email });
    } catch (e) {
      console.log(e);
      return null;
    }
    return true;
  }
}
