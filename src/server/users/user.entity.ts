import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @PrimaryColumn("varchar", { length: 30 })
  email: string;
  
  @Column("varchar", { length: 200 })
  password: string;

  @Column("varchar", { length: 20 })
  name: string;

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