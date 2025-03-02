import { ExecutionContext, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { isPublic } from '../execution-context.utils';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(executionContext: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
    const isPublicEndpoint = isPublic(this.reflector, executionContext);

    if (isPublicEndpoint != null && isPublicEndpoint) {
      this.logger.log('Public endpoint accessed');
      return true;
    }

    this.logger.log('Protected endpoint accessed');
    return super.canActivate(executionContext);
  }


}
