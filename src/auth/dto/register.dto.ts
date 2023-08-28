import { IsNotEmpty, IsString } from 'class-validator';

export default class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
