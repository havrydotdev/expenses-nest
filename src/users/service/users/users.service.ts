import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from 'src/users/dto/create-user.dto';
import {
  UpdateUserBalanceDto,
  UpdateUserNameDto,
} from 'src/users/dto/update-user.dto';
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

  async findOneById(userId: number): Promise<User | null> {
    return this.usersRepo.findOneBy({
      id: userId,
    });
  }

  async create(user: CreateUserDto): Promise<number> {
    user.password = encodePassword(user.password);
    const createdUser = await this.usersRepo.insert(user);
    return createdUser.identifiers[0].id;
  }

  async update(
    userId: number,
    updateInput: UpdateUserNameDto | UpdateUserBalanceDto,
  ): Promise<User | null> {
    const user = await this.findOneById(userId);
    if (!user) {
      return null;
    }

    const result = await this.usersRepo.save({
      ...user,
      ...updateInput,
    });

    return result;
  }

  async updateBalance(
    userId: number,
    updateInput: UpdateUserBalanceDto,
  ): Promise<void> {
    await this.usersRepo
      .createQueryBuilder()
      .update<User>(User)
      .set({
        balance: () => `balance + ${updateInput.value}`,
      })
      .where('id = :id', { id: userId })
      .execute();
  }

  async updateUsername(
    userId: number,
    updateInput: UpdateUserNameDto,
  ): Promise<User> {
    const result = await this.update(userId, updateInput);
    return result;
  }
}
