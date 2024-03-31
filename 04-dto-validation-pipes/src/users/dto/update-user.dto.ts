import { CreateUserDto } from './create-user.dto'
import { PartialType } from '@nestjs/mapped-types'

//! We extend (UpdateUserDTO) type by extending of (PartialType(CreateUserDTO)) it means we get all types of (CreateUserDTO) but all the type is optional
export class UpdateUserDto extends PartialType(CreateUserDto) {}
