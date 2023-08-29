import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateIncomeDto from 'src/incomes/dto/create-income.dto';
import IncomeDto from 'src/incomes/dto/income.dto';
import Income from 'src/incomes/entities/income.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(Income) private incomesRepo: Repository<Income>,
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

  async create(incomes: CreateIncomeDto[]): Promise<IncomeDto[]> {
    const result = await this.incomesRepo
      .createQueryBuilder()
      .insert()
      .into(Income)
      .values(
        incomes.map((dto: CreateIncomeDto) => ({
          ...dto,
          date: new Date(),
          user: {
            id: dto.userId,
          },
        })),
      )
      .returning('*')
      .execute();

    return result.raw as IncomeDto[];
  }
}
