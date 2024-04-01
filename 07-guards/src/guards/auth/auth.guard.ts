import { Request } from 'express'

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    console.log('Inside AuthGuard')
    return true
  }
}
