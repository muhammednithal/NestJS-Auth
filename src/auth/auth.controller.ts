import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { get } from 'http';
import { AuthGaurd } from './gaurds/auth.gaurds';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGaurd)
  @Get()
  getusee(@Request() request) {
    return request.user;
  }

  @Post('login')
  login(@Body() input: { id: number; email: string }) {
    return this.authService.authenticate(input);
  }
}
