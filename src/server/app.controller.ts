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
  async saveUser(@Body() user: User): Promise<Object> {
  const duplicateUser = await this.userService.findOne(user.email);
  if(duplicateUser != null){
    return {
      "status" : "overlap"
    }
  }

  const result = await this.userService.saveUser(user);
  if(result == null){
    return {
      "status" : "error"
    };
  }
    return Object.assign({
      statusCode: 201,
      statusMsg: `saved successfully`,
    });
  }

  @Post('user/delete')
  async deleteUser(@Body() user: User): Promise<Object> {
    const findUser = this.userService.findOne(user.email);
    if(findUser == null) return {"status" : "error"};

    const result = await this.userService.deleteUser(user.email);
    if(result == null){
      return {
        "status" : "deleteError"
      }
    }

    return Object.assign({
      data: { userEmail: user.email },
      statusCode: 201,
      statusMsg: `deleted successfully`,
    });
  }

}
