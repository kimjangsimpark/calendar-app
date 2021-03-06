import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('home')
  public index() {
    return {
      title: 'Next with Nest',
    };
  }

  @Get('signup')
  @Render('signup')
  public signup() {
    return {
      title: 'Next with Nest',
    };
  }

  @Get('login')
  @Render('login')
  public login() {
    return {
      title: 'Next with Nest',
    };
  }
}
