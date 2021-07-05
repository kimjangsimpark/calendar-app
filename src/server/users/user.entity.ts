import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, BeforeInsert, ManyToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Schedule } from './schedule.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @PrimaryColumn("varchar", { length: 30 , nullable: false},)
  email: string;
  
  @Column("varchar", { length: 200 , nullable: false })
  password: string;

  @Column("varchar", { length: 20 , nullable: false })
  name: string;

  @OneToMany(type => Schedule, schedule => schedule.user)
  schedule : Schedule[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
      try {
          this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
  }
}