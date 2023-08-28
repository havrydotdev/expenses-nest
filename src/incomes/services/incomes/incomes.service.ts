import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateIncomeDto from 'src/incomes/dto/create-income.dto';
import IncomeDto from 'src/incomes/dto/income.dto';
import Income from 'src/incomes/entities/income.entity';
import { UsersService } from 'src/users/service/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(Income) private incomesRepo: Repository<Income>,
    private usersService: UsersService,
  ) {}

  async findAll(userId: number): Promise<Income[]> {
    return this.incomesRepo.findBy({
      user: {
        id: userId,
      },
    });
  }

  async findOneById(userId: number, incomeId: number): Promise<Income> {
    return this.incomesRepo.findOneBy({
      id: incomeId,
      user: {
        id: userId,
      },
    });
  }

  async create(userId: number, income: CreateIncomeDto): Promise<IncomeDto> {
    this.usersService.updateBalance(userId, {
      value: income.value,
    });

    const result = await this.incomesRepo
      .createQueryBuilder()
      .insert()
      .into(Income)
      .values({
        title: income.title,
        desc: income.desc,
        value: income.value,
        date: new Date(),
        user: {
          id: userId,
        },
      })
      .returning('*')
      .execute();

    return result.raw as IncomeDto;
  }
}
