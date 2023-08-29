import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import Dates from '../interfaces/dates.enum';

export default class CreateScheduleDto {
  @IsNotEmpty()
  date: Dates;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  @IsString()
  title: string;
}
