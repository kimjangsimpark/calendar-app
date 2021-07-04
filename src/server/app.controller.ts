import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('api')
export class AppController {
  constructor(private authService: AuthService){}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('login')
  findAll(): string {
    return JSON.stringify({
      data: {
        accessToken:
          'aaa.bbb.ccc1',
      },
    });
  }
  @Get('user')
  getUser(): string {
    return JSON.stringify({
      data: {
        name: '심익현',
        id: 'test',
      }
    })
  }
}
