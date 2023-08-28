import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './users/entities/user.entity';
import { pg } from './constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: pg.host,
      port: pg.port,
      username: pg.username,
      password: pg.password,
      database: pg.database,
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
