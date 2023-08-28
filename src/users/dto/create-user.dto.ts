import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
