import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsPositive()
  @IsNumber()
  value: number;

  desc?: string;
}
