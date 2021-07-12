/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email: email });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async saveUser(email: string, password: string, name: string): Promise<any> {
    const existUser = await this.usersRepository.findOne(email);

    if (existUser) {
      throw new Error('Already exist user');
    }

    const entity = this.usersRepository.create({
      email: email,
      password: password,
      name: name,
    });

    await this.usersRepository.save(entity);
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
