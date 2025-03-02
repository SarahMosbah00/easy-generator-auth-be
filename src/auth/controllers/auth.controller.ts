import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import {
  AUTH_SERVICE,
  AUTH_SERVICE_INJECTION_TOKEN,
} from '../constants/injection-tokens';
import { AuthService } from '../services/auth/auth.interface';
import { CreateUserDto } from '../dtos/createUserDto';
import { VerificationTokenQuery } from '../dtos/verifyTokenQuery';
import { SignInDto } from '../dtos/signInDto';
import { Public } from '../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_INJECTION_TOKEN)
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Get('verify-email')
  verifyEmail(@Query('token') { token }: VerificationTokenQuery) {
    return this.authService.verify(token);
  }

  @Public()
  @Post('signin')
  signIn(@Body() { email, password }: SignInDto) {
    return this.authService.signIn(email, password);
  }
}
