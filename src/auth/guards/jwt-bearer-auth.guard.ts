import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { isPublic } from '../execution-context.utils';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(executionContext: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
    const isPublicEndpoint = isPublic(this.reflector, executionContext);

    if (isPublicEndpoint != null && isPublicEndpoint) {
      return true;
    }

    return super.canActivate(executionContext);
  }


}
