import { Module } from '@nestjs/common';
import { IncomesService } from './services/incomes/incomes.service';
import { IncomesController } from './controllers/incomes/incomes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import Income from './entities/income.entity';
import { IncomeSubscriber } from './subscribers/income.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Income]), UsersModule],
  providers: [IncomesService, IncomeSubscriber],
  controllers: [IncomesController],
  exports: [IncomesService],
})
export class IncomesModule {}
