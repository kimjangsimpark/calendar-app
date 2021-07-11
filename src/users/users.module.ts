import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Schedule } from './schedule.entity';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Schedule])],
  providers: [UsersService, ScheduleService],
  exports: [TypeOrmModule , UsersService, ScheduleService],
})
export class UsersModule {}