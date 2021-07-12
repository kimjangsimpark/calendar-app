import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.schedule, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column('varchar', { length: 30, default: 'white' })
  color: string;

  @Column('varchar', { length: 30 })
  category: string;

  @Column('varchar', { length: 20, nullable: false })
  startDate: string;

  @Column('varchar', { length: 20, nullable: false })
  endDate: string;

  // 0 : false , 1 : true
  @Column('varchar', { length: 5, nullable: false })
  isAllDay: number;

  @Column('varchar', { length: 5, nullable: false })
  isReadOnly: number;
}
