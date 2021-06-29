import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller('api')
export class AppController {
  @UseGuards(LocalAuthGuard)

  @Post('auth/login')
  async login(@Request() req) {
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
