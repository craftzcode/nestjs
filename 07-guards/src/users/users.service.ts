import { Injectable } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  private readonly dummyDatabase = [
    {
      id: 1,
      name: 'Ivan Gregor Tabalno',
      age: 24
    },
    {
      id: 2,
      name: 'Aiori Lovemir Iveen Tabalno',
      age: 2
    },
    {
      id: 3,
      name: 'Christine Joyce Amper',
      age: 24
    }
  ]

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user'
  }

  findAll() {
    return this.dummyDatabase
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
