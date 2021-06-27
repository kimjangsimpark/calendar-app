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
          'tokentokentokentokentokentokentokentokentokentokentokentoken',
      },
    });
  }
}
