import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request as ExpressReq } from 'express';
import RegisterUserDto from 'src/auth/dto/register.dto';
import LoginUserDto from 'src/auth/dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt-auth.guard';
import { AuthService } from 'src/auth/services/auth/auth.service';
import SignUserDto from 'src/auth/dto/sign-user.dto';
import { LocalAuthGuard } from 'src/auth/guards/local/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() reqBody: LoginUserDto) {
    return this.authService.login(reqBody);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(
    @Body() reqBody: RegisterUserDto,
  ): Promise<{ userId: number }> {
    const userId = await this.authService.register(reqBody);
    return {
      // id of created user
      userId,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: ExpressReq): SignUserDto {
    return req.user;
  }
}
