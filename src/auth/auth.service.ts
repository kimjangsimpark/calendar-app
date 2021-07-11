import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && bcrypt.compare(user.password, pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateAccessToken(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new Error('No user found');
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      throw new Error('password not matched');
    }

    return this.jwtService.sign({
      email: user.email,
      name: user.name,
    });
  }
}
