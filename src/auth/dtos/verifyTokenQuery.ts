import { IsNotEmpty, IsString } from 'class-validator';

export class VerificationTokenQuery {
  @IsString()
  @IsNotEmpty()
  token: string;
}
