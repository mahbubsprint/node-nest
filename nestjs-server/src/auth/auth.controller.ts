import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LogInUserDto } from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup( @Body() createuserDto:CreateUserDto ) {
    return this.authService.signup(createuserDto);
  }
  @Post('login')
  login(@Request() req, @Response() res, @Body() logInUserDto:LogInUserDto ) {
    return this.authService.login(logInUserDto, req, res);
  }
}
