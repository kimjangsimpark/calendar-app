import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(    
  @InjectRepository(User)
  private usersRepository: Repository<User>,)
  {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({email :email});
  }

  async saveUser(user: User): Promise<void> {
    try {
      await this.usersRepository.save(this.usersRepository.create(user));
      } catch(e){
        console.error(e);
      }
    }
    
  async deleteUser(email: string): Promise<void> {
     await this.usersRepository.delete({ email: email });
  }

}