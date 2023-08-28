import { Module } from '@nestjs/common';
import { ExpensesService } from './services/expenses/expenses.service';
import { ExpensesController } from './controllers/expenses/expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Expense from './entities/expense.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), UsersModule],
  providers: [ExpensesService],
  controllers: [ExpensesController],
})
export class ExpensesModule {}
