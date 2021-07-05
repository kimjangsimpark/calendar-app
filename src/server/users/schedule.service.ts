import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(    
  @InjectRepository(Schedule)
  private scheduleRepository: Repository<Schedule>,)
  {}

  async findAll(id: string): Promise<Schedule[]> {
    return this.scheduleRepository.find();
  }

  async findOne(id: string): Promise<Schedule> {
    return this.scheduleRepository.findOne({id : id});
  }

  async saveSchedule(calendar: Schedule): Promise<any> {
    try{
      await this.scheduleRepository.save(calendar);
    } catch(e){
      console.log(e);
      return null;
    }
    return true;
    }
    
  async deleteSchedule(id: string): Promise<any> {
    try {
      await this.scheduleRepository.delete({ id: id });
    } catch(e){
      console.log(e);
      return null;
    } 
    return true;
  }

  async updateCalendar(category: string): Promise<any> {
    try {
      await this.scheduleRepository.update(null,null);
    } catch(e){
      console.log(e);
      return null;
    } 
    return true;
  }

}