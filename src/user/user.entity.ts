import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Schedule } from './schedule.entity';

@Entity()
export class User {
  @PrimaryColumn('varchar', { length: 100, nullable: false })
  email: string;

  @Column('varchar', { length: 200, nullable: false })
  password: string;

  @Column('varchar', { length: 20, nullable: false })
  name: string;

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedule: Schedule[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
