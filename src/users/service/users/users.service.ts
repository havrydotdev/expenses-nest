import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from 'src/users/dto/create-user.dto';
import User from 'src/users/entities/user.entity';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async findOne(username: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: {
        username: username,
      },
    });
  }

  async create(user: CreateUserDto): Promise<number> {
    user.password = encodePassword(user.password);
    const createdUser = await this.usersRepo.insert(user);
    return createdUser.identifiers[0].id;
  }
}
