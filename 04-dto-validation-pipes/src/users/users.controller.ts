import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common'

import { UsersService } from './users.service'

//! Global Types & Schemas Validation
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ValidationPipe } from '@nestjs/common/pipes'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: 'USER' | 'ADMIN') {
    return this.usersService.findAll(role)
  }

  @Get(':id')
  findOne(
    //! (ParseIntPipe) transforming the (Route Param) string into numeric string, also it's validation if you pass an string to (Route Param) it will validate if it is a numeric string
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.usersService.findOne(id)
  }

  @Post()
  create(
    //! (ValidationPipe) to validate our validation schema inside of (CreateUserDto)
    @Body(ValidationPipe)
    CreateUserDto: CreateUserDto
  ) {
    return this.usersService.create(CreateUserDto)
  }

  @Patch(':id')
  update(
    //! (ParseIntPipe) transforming the (Route Param) string into numeric string, also it's validation if you pass an string to (Route Param) it will validate if it is a numeric string
    @Param('id', ParseIntPipe) id: number,
    //! (ValidationPipe) to validate our validation schema inside of (UpdateUserDto)
    @Body(ValidationPipe)
    userUpdate: UpdateUserDto
  ) {
    return this.usersService.update(id, userUpdate)
  }

  @Delete(':id')
  delete(
    //! (ParseIntPipe) transforming the (Route Param) string into numeric string, also it's validation if you pass an string to (Route Param) it will validate if it is a numeric string
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.usersService.delete(id)
  }
}
