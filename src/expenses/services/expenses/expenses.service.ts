import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExpenseDto } from 'src/expenses/dto/create-expense.dto';
import ExpenseDto from 'src/expenses/dto/expense.dto';
import Expense from 'src/expenses/entities/expense.entity';
import { UsersService } from 'src/users/service/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private expensesRepo: Repository<Expense>,
    private usersService: UsersService,
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

  async create(userId: number, expense: CreateExpenseDto): Promise<ExpenseDto> {
    this.usersService.updateBalance(userId, {
      value: -expense.value,
    });

    const result = await this.expensesRepo
      .createQueryBuilder()
      .insert()
      .into(Expense)
      .values({
        title: expense.title,
        desc: expense.desc,
        value: expense.value,
        date: new Date(),
        user: {
          id: userId,
        },
      })
      .returning('*')
      .execute();

    return result.raw as ExpenseDto;
  }
}
