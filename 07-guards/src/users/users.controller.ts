import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'
import { Roles } from 'src/decorators/roles/roles.decorator'
import { AuthGuard } from 'src/guards/auth/auth.guard'
import { RolesGuard } from 'src/guards/roles/roles.guard'

@Controller('users')
//! This is like an (Authentication Middleware)
// This is will invoke the (AuthGuard) in whole (UserController)
// @UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @Roles(['ADMIN'])
  //! This is like an (Authentication Middleware)
  @UseGuards(AuthGuard, RolesGuard)
  // This is will invoke the (AuthGuard) in a specific (Route)
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
