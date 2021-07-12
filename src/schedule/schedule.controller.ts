import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { Schedule } from './schedule.entity';
import { ScheduleService } from './schedule.service';

@Controller('api/schedule')
export class ScheduleController {
  constructor(
    private readonly userService: UserService,
    private readonly scheduleService: ScheduleService,
  ) {}

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
