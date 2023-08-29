import { Module } from '@nestjs/common';
import { SchedulesService } from './services/schedules/schedules.service';
import { SchedulesController } from './controllers/schedules/schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Schedule from './entities/schedule.entity';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { IncomesModule } from 'src/incomes/incomes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule]),
    ExpensesModule,
    IncomesModule,
  ],
  providers: [SchedulesService],
  controllers: [SchedulesController],
})
export class SchedulesModule {}
