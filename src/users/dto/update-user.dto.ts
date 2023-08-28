import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

class UpdateUserBalanceDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  balance: number;
}

class UpdateUserNameDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}

export { UpdateUserBalanceDto, UpdateUserNameDto };
