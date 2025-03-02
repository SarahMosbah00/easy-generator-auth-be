import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.interface';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { UserRepository } from '../../repositories/user-repository.interface';
import { UserModel } from '../../models/user.model';
import { CREATE_USER_OMIT_PROPERTIES } from '../../constants/mapped-types';
import { EmailService } from '../email/email.interface';
import { EMAIL_SERVICE_INJECTION_TOKEN } from 'src/auth/constants/injection-tokens';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/auth/constants/environment-variables';

@Injectable()
export class DefaultAuthService implements AuthService {
  private privateKey: string;

  constructor(
    private readonly jwtService: JwtService,
    @Inject('EMAIL_SERVICE')
    private readonly emailService: EmailService,
    @Inject('USERS_REPOSITORY') private readonly userRepository: UserRepository,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    this.privateKey = this.configService.getOrThrow('JWT_PRIVATE_SECRET', {
      infer: true,
    });
  }

  public async signUp(
    userToCreate: Omit<UserModel, (typeof CREATE_USER_OMIT_PROPERTIES)[number]>,
  ): Promise<void> {
    const { email, username, password } = userToCreate;
    if (await this.userRepository.findByEmail(email)) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = randomBytes(32).toString('hex');

    await this.userRepository.create({
      email,
      username,
      password: hashedPassword,
      verificationToken,
    });

    // Can Implement a session and commit it only after sending verification mail
    try {
      await this.emailService.sendVerificationMail(email, verificationToken);
    } catch (e) {
      await this.userRepository.deleteByEmail(email);
      throw new BadRequestException('Failed to send verification email');
    }
  }
  public async signIn(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user.isVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }

    const { id, username, isVerified } = user;
    const expiresIn = this.configService.get('JWT_EXPIRATION', '3600s', {
      infer: true,
    });
    
    const accessToken = this.jwtService.sign(
      {
        id,
        email,
        username,
        isVerified,
      },
      { algorithm: 'RS256', privateKey: this.privateKey, expiresIn },
    );

    return accessToken;
  }

  public async verify(token: string): Promise<void> {
    const user = await this.userRepository.findByVerificationToken(token);
    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }
    await this.userRepository.verifyUser(user.id!);
  }
}
