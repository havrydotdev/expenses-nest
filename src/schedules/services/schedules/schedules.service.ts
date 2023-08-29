import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { cron } from 'src/constants';
import Schedule from 'src/schedules/entities/schedule.entity';
import { Repository } from 'typeorm';
import CreateScheduleDto from 'src/schedules/dto/create-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule) private scheduleRepo: Repository<Schedule>,
  ) {}

  private readonly logger = new Logger(SchedulesService.name);

  @Cron(cron.EVERY_WEEK)
  handleEveryWeek() {
    this.logger.debug('Called EVERY_WEEK cron handler');
  }

  @Cron(cron.EVERY_DAY)
  handleEveryDay() {
    this.logger.debug('Called EVERY_DAY cron handler');
  }

  @Cron(cron.EVERY_MONTH)
  handleEveryMonth() {
    this.logger.debug('Called EVERY_MONTH cron handler');
  }

  async create(userId: number, createDto: CreateScheduleDto) {
    const result = await this.scheduleRepo
      .createQueryBuilder()
      .insert()
      .into(Schedule)
      .values({
        ...createDto,
        user: {
          id: userId,
        },
      })
      .returning('*')
      .execute();

    return result.raw;
  }
}
