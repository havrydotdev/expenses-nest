import User from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: true,
  })
  desc: string;

  @Column({
    nullable: false,
  })
  value: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  user: User;
}
