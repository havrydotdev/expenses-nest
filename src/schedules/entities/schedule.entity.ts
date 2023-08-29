import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Dates from '../interfaces/dates.enum';
import User from 'src/users/entities/user.entity';

@Entity()
export default class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Dates,
  })
  date: Dates;

  @Column()
  value: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
