import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async generateAccessToken(email: string, password: string) {
    const user = await this.userService.findOne(email);
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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
