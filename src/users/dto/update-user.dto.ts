import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class UpdateUserBalanceDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;
}

class UpdateUserNameDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}

export { UpdateUserBalanceDto, UpdateUserNameDto };
