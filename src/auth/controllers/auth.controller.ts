import { Body, Controller, Get, Inject, Post, Query, Res, Logger } from '@nestjs/common';
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

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

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
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    this.logger.log(`Registration attempt for user: ${createUserDto.email}`);
    await this.authService.signUp(createUserDto);
    this.logger.log(`Registration successful for user: ${createUserDto.email}`);
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
    this.logger.log(`Login attempt for user: ${email}`);
    const accessToken = await this.authService.signIn(email, password);
    this.logger.log(`Login successful for user: ${email}`);
    res.cookie('jwt', accessToken, { httpOnly: true, secure: true });
    return res.send({ message: 'User successfully signed in' });
  }
}
