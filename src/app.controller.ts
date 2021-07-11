import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';
import { ScheduleService } from './users/schedule.service';
import { Schedule } from './users/schedule.entity';
import { Request } from 'express';
import { LoginData } from './interfaces';

@Controller('api')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly scheduleService: ScheduleService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Post('auth/login')
  async login(
    @Req() request: Request<void, void, { email: string; password: string }>,
  ): Promise<{ accessToken: string }> {
    try {
      const body = request.body;
      const token = await this.authService.generateAccessToken(
        body.email,
        body.password,
      );
      return {
        accessToken: token,
      };
    } catch (e) {
      throw new HttpException('no matched user found', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('user/save')
  async saveUser(
    @Req()
    request: Request<
      void,
      void,
      { email: string; password: string; name: string }
    >,
  ): Promise<{ result: true }> {
    try {
      const body = request.body;
      await this.userService.saveUser(body.email, body.password, body.name);
      return { result: true };
    } catch (e) {
      throw new HttpException('User already exist', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('user/delete')
  async deleteUser(@Body() user: User): Promise<Object> {
    const findUser = this.userService.findOne(user.email);
    if (findUser == null) return { status: 'error' };

    const result = await this.userService.deleteUser(user.email);
    if (result == null) {
      return {
        status: 'deleteError',
      };
    }

    return Object.assign({
      data: { userEmail: user.email },
      statusCode: 201,
      statusMsg: `deleted successfully`,
    });
  }

  @Post('schedule/save')
  async saveSchedule(@Body() schedule: Schedule): Promise<Object> {
    const result = await this.scheduleService.saveSchedule(schedule);
    if (result == null) {
      return {
        status: 'error',
      };
    }
    return Object.assign({
      statusCode: 201,
      statusMsg: `saved successfully`,
    });
  }

  @Post('schedule/delete')
  async deleteSchedule(@Body() schedule: Schedule): Promise<Object> {
    const validate = this.scheduleService.findOne(schedule.id);
    if (validate == null) return { status: 'error' };

    const result = await this.userService.deleteUser('schedule.email');
    if (result == null) {
      return {
        status: 'deleteError',
      };
    }

    return Object.assign({
      data: { scheduleId: schedule.id },
      statusCode: 201,
      statusMsg: `deleted successfully`,
    });
  }
}
