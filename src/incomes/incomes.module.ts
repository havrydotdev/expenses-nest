import { Module } from '@nestjs/common';
import { IncomesService } from './services/incomes/incomes.service';
import { IncomesController } from './controllers/incomes/incomes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import Income from './entities/income.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Income]), UsersModule],
  providers: [IncomesService],
  controllers: [IncomesController],
  exports: [IncomesService],
})
export class IncomesModule {}
