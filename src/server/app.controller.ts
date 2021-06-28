import { Controller, Get, Next, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

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
