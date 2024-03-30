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

//! (@Controller('users')) this is a parent route (domain/users)
@Controller('users')
export class UsersController {
  //! GET /users or /users?role=value
  @Get()
  findAll(@Query('role') role?: 'USER' | 'ADMIN') {
    //! The logic for this will handled inside of our (service)
    return []
  }

  //! If you have another static route like this (/users/admin) you should put it above where's the dynamic route (/users/:id)
  // @Get('admin')
  // findAllAdmins() {
  //   return []
  // }

  //! GET /users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    //! The logic for this will handled inside of our (service)
    return { id }
  }

  //! POST /users
  @Post()
  create(@Body() user: {}) {
    return user
  }

  //! PATCH /users/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate }
  }

  //! DELETE /users/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id }
  }
}
