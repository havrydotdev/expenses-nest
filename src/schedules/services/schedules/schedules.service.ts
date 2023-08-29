import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { cron } from 'src/constants';
import Schedule from 'src/schedules/entities/schedule.entity';
import { Repository } from 'typeorm';
import CreateScheduleDto from 'src/schedules/dto/create-schedule.dto';
import Dates from 'src/schedules/interfaces/dates.enum';
import { IncomesService } from 'src/incomes/services/incomes/incomes.service';
import { ExpensesService } from 'src/expenses/services/expenses/expenses.service';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule) private scheduleRepo: Repository<Schedule>,
    private incomesService: IncomesService,
    private expensesService: ExpensesService,
  ) {}

  private readonly logger = new Logger(SchedulesService.name);

  @Cron(cron.EVERY_WEEK)
  handleEveryWeek() {
    this.logger.debug('Called EVERY_WEEK cron handler');
    this.executeSchedulesByDate(Dates.Weekly);
  }

  @Cron(cron.EVERY_DAY)
  handleEveryDay() {
    this.logger.debug('Called EVERY_DAY cron handler');
    this.executeSchedulesByDate(Dates.Daily);
  }

  @Cron(cron.EVERY_MONTH)
  handleEveryMonth() {
    this.logger.debug('Called EVERY_MONTH cron handler');
    this.executeSchedulesByDate(Dates.Monthly);
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

  async getAllByDate(date: Dates): Promise<Schedule[]> {
    return this.scheduleRepo.findBy({
      date: date,
    });
  }

  async executeSchedulesByDate(date: Dates): Promise<void> {
    const schedules = await this.getAllByDate(date);

    this.expensesService.create(
      schedules
        .filter((sch: Schedule) => sch.value < 0)
        .map((sch) => ({
          ...sch,
          value: -sch.value,
          userId: sch.user.id,
        })),
    );

    this.incomesService.create(
      schedules
        .filter((sch: Schedule) => sch.value > 0)
        .map((sch) => ({
          ...sch,
          value: sch.value,
          userId: sch.user.id,
        })),
    );
  }
}
