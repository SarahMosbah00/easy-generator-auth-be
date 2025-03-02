import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/auth/constants/environment-variables';
import { EmailService } from './email.interface';

@Injectable()
export class NodeMailerEmailService implements EmailService {
  private transporter: nodemailer.Transporter;
  private appDomain: string | undefined;
  private emailUser: string;

  constructor(private readonly configService: ConfigService<EnvironmentVariables>) {
  
    this.emailUser = this.configService.getOrThrow('EMAIL_USER', {
      infer: true,
    });

    const emailUserPassword = this.configService.getOrThrow('EMAIL_PASSWORD_USER', {
      infer: true,
    });

    this.appDomain = this.configService.getOrThrow('APP_DOMAIN', {
      infer: true,
    });

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.emailUser,
        pass: emailUserPassword,
      },
    });
  }



  async sendVerificationMail(email: string, token: string): Promise<void> {
    const verificationUrl = `${this.appDomain}/verify-email?token=${token}`;

    await this.transporter.sendMail({
      from: this.emailUser,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Click the link below to verify your email:</p>
             <a href="${verificationUrl}">${verificationUrl}</a>`,
    });
  }
}
