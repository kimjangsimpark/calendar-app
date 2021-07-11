import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';
import { ScheduleService } from './users/schedule.service';
import { Schedule } from './users/schedule.entity';

@Controller('api')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly scheduleService: ScheduleService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('user/save')
  async saveUser(@Body() user: User): Promise<Object> {
    const duplicateUser = await this.userService.findOne(user.email);
    if (duplicateUser != null) {
      return {
        status: 'overlap',
      };
    }

    const result = await this.userService.saveUser(user);
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
