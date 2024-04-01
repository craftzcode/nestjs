//! (Decorator) Is just like we are creating a (Function)
import { Reflector } from '@nestjs/core'

//! This is like an storage (const, var, let) when we inject this decorator and pass a argument it will stored here, then we can use/get that argument inside on our (RolesGuard)
export const Roles = Reflector.createDecorator<string[]>()
