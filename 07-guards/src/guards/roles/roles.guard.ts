import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { Observable } from 'rxjs'

import { Roles } from 'src/decorators/roles/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private readonly database = [
    {
      id: 1,
      name: 'Ivan Gregor Tabalno',
      age: 24,
      roles: ['ADMIN']
    }
  ]

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Inside RolesGuard')
    //! The value/argument of (Roles) we will get it in a specific (Controller) method
    //! (context.getHandler()) Is the (Controller) method that where this (RolesGuard) placed
    const requiredRoles = this.reflector.get(Roles, context.getHandler())

    // This will handle the logic of checking the roles on the database or in request.user.roles

    if (
      requiredRoles.every(requiredRole =>
        this.database[0].roles.includes(requiredRole)
      )
    ) {
      console.log('User has every required role')
      return true
    }

    return false
  }
}
