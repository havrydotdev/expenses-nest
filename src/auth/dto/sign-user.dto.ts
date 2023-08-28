import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class SignUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;
}
