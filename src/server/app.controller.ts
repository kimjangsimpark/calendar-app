import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';

@Controller('api')
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UsersService){}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('user/save')
  async saveUser(@Body() user: User): Promise<string> {
    await this.userService.saveUser(user);
    return Object.assign({
      data: { ...user },
      statusCode: 201,
      statusMsg: `saved successfully`,
    });
  }
  @Delete('user/delete')
  async deleteUser(@Param('userId') id: string): Promise<string> {
    await this.userService.deleteUser(id);
    return Object.assign({
      data: { userId: id },
      statusCode: 201,
      statusMsg: `deleted successfully`,
    });
  }

}
