import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import RegisterUserDto from 'src/auth/dto/register.dto';
import LoginUserDto from 'src/auth/dto/login-user.dto';
import { UsersService } from 'src/users/service/users/users.service';
import SignUserDto from 'src/auth/dto/sign-user.dto';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    username,
    password,
  }: LoginUserDto): Promise<SignUserDto | null> {
    const user = await this.usersService.findOne(username);
    if (user && comparePasswords(password, user.password)) {
      return {
        id: user.id,
        username: user.username,
      };
    }

    return null;
  }

  async login(loginDto: LoginUserDto) {
    const signPayload = await this.validateUser({
      username: loginDto.username,
      password: loginDto.password,
    });

    return {
      access_token: this.jwtService.sign({
        username: signPayload.username,
        id: signPayload.id,
      }),
    };
  }

  async register(regDto: RegisterUserDto): Promise<number> {
    return this.usersService.create(regDto);
  }
}
