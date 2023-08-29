import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './users/entities/user.entity';
import { pg } from './constants';
import { ExpensesModule } from './expenses/expenses.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { JwtAuthGuard } from './auth/guards/jwt/jwt-auth.guard';
import { IncomesModule } from './incomes/incomes.module';
import { SchedulesModule } from './schedules/schedules.module';
import Expense from './expenses/entities/expense.entity';
import Income from './incomes/entities/income.entity';
import { ScheduleModule } from '@nestjs/schedule';
import Schedule from './schedules/entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: pg.host,
      port: pg.port,
      username: pg.username,
      password: pg.password,
      database: pg.database,
      entities: [User, Expense, Income, Schedule],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    CacheModule.register(),
    AuthModule,
    UsersModule,
    ExpensesModule,
    IncomesModule,
    SchedulesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
