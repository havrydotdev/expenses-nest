import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export default class CreateIncomeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsPositive()
  @IsNumber()
  value: number;

  desc?: string;

  // initialized in controller
  userId?: number;
}
