import Dates from '../interfaces/dates.enum';

export default class ScheduleDto {
  id: number;

  date: Dates;

  value: number;

  title: string;

  userId: number;
}
