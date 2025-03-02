import { Body, Controller, Get, Inject, Post, Query, Res } from '@nestjs/common';
import {
  AUTH_SERVICE,
  AUTH_SERVICE_INJECTION_TOKEN,
} from '../constants/injection-tokens';
import { AuthService } from '../services/auth/auth.interface';
import { CreateUserDto } from '../dtos/createUserDto';
import { VerificationTokenQuery } from '../dtos/verifyTokenQuery';
import { SignInDto } from '../dtos/signInDto';
import { Public } from '../decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_INJECTION_TOKEN)
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      example: {
        summary: 'Sample request',
        value: {
          email: 'user@example.com',
          username: 'user123',
          password: 'password123!',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User successfully signed up' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Get('verify-email')
  @ApiOperation({ summary: 'Verify user email' })
  @ApiQuery({ name: 'token', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Email successfully verified' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  verifyEmail(@Query() { token }: VerificationTokenQuery) {
    return this.authService.verify(token);
  }


  @Public()
  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiBody({
    type: SignInDto,
    examples: {
      example: {
        summary: 'Sample request',
        value: {
          email: 'user@example.com',
          password: 'password123!',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User successfully signed in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(@Body() { email, password }: SignInDto, @Res() res: Response) {
    const accessToken = await this.authService.signIn(email, password);
    res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'strict' });
    return res.send({ message: 'User successfully signed in' });
  }
}
