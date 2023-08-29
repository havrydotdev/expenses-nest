import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExpenseDto } from 'src/expenses/dto/create-expense.dto';
import ExpenseDto from 'src/expenses/dto/expense.dto';
import Expense from 'src/expenses/entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private expensesRepo: Repository<Expense>,
  ) {}

  async findAll(userId: number): Promise<Expense[]> {
    return this.expensesRepo.findBy({
      user: {
        id: userId,
      },
    });
  }

  async findOneById(userId: number, expenseId: number): Promise<Expense> {
    return this.expensesRepo.findOneBy({
      id: expenseId,
      user: {
        id: userId,
      },
    });
  }

  async create(expenses: CreateExpenseDto[]): Promise<ExpenseDto[]> {
    const result = await this.expensesRepo
      .createQueryBuilder()
      .insert()
      .into(Expense)
      .values(
        expenses.map((dto: CreateExpenseDto) => ({
          ...dto,
          date: new Date(),
          user: {
            id: dto.userId,
          },
        })),
      )
      .returning('*')
      .execute();

    return result.raw as ExpenseDto[];
  }
}
