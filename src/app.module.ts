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
import Expense from './expenses/entities/expense.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: pg.host,
      port: pg.port,
      username: pg.username,
      password: pg.password,
      database: pg.database,
      entities: [User, Expense],
      autoLoadEntities: true,
      synchronize: true,
    }),
    CacheModule.register(),
    AuthModule,
    UsersModule,
    ExpensesModule,
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
