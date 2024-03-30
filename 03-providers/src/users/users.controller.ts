import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  //! To inject our all method that created on (UsersService)
  //! This is like (const usersService = new UsersService())
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: 'USER' | 'ADMIN') {
    //! To use (findAll) method that created inside of (UsersService)
    return this.usersService.findAll(role)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //! To use (findOne) method that created inside of (UsersService)
    // We add (+) sign on the (findOne) argument because our (id) on (findOne) function is type of number, because on our (Route Params) is always an string that's why we convert the (+id) argument to handle the (id) that type of number
    return this.usersService.findOne(+id)
  }

  @Post()
  create(
    @Body()
    user: {
      name: string
      username: string
      email: string
      password: string
      role: 'USER' | 'ADMIN'
    }
  ) {
    //! To use (create) method that created inside of (UsersService)
    return this.usersService.create(user)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    userUpdate: {
      name?: string
      username?: string
      email?: string
      password?: string
      role?: 'USER' | 'ADMIN'
    }
  ) {
    return this.usersService.update(+id, userUpdate)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    //! To use (delete) method that created inside of (UsersService)
    // We add (+) sign on the (findOne) argument because our (id) on (findOne) function is type of number, because on our (Route Params) is always an string that's why we convert the (+id) argument to handle the (id) that type of number
    return this.usersService.delete(+id)
  }
}
