import { Module } from '@nestjs/common';
import { SchedulesService } from './services/schedules/schedules.service';
import { SchedulesController } from './controllers/schedules/schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Schedule from './entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  providers: [SchedulesService],
  controllers: [SchedulesController],
})
export class SchedulesModule {}
