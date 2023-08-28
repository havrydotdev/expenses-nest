import User from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Income {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  desc?: string;

  @Column()
  value: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  user: User;
}
