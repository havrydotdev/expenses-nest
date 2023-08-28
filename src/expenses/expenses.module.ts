import { Module } from '@nestjs/common';
import { ExpensesService } from './services/expenses/expenses.service';
import { ExpensesController } from './controllers/expenses/expenses.controller';

@Module({
  providers: [ExpensesService],
  controllers: [ExpensesController],
})
export class ExpensesModule {}
