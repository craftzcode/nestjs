import { Injectable } from '@nestjs/common'

//! Global Types & Schemas Validation
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

//! Validation for HTTP Requests
import { NotFoundException } from '@nestjs/common/exceptions'

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: 'password123',
      role: 'ADMIN'
    },
    {
      id: 2,
      name: 'Alice Smith',
      username: 'alicesmith',
      email: 'alice.smith@example.com',
      password: 'securepwd',
      role: 'USER'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      username: 'bobjohnson',
      email: 'bob.johnson@example.com',
      password: 'bobpass',
      role: 'USER'
    },
    {
      id: 4,
      name: 'Emily Brown',
      username: 'emilybrown',
      email: 'emily.b@example.com',
      password: 'emilypass',
      role: 'ADMIN'
    },
    {
      id: 5,
      name: 'Michael Davis',
      username: 'michaeld',
      email: 'michael.davis@example.com',
      password: 'mdp@ssword',
      role: 'USER'
    }
  ]

  findAll(role?: CreateUserDto['role']) {
    if (role) {
      const rolesArray = this.users.filter(user => user.role === role)

      //! (NotFoundException) display an error if the (Query Param) role is not exist on (users)
      if (!rolesArray.length) throw new NotFoundException('User Role Not Found')

      return rolesArray
    }

    return this.users
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id)

    //! (NotFoundException) display an error if the (Route Param) id is not exist on (users)
    if (!user) throw new NotFoundException('User not found')

    return user
  }

  create(user: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)
    const newUser = { id: userByHighestId[0].id + 1, ...user }

    this.users.push(newUser)
    return newUser
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return { ...user, ...updateUserDto }
      }

      return user
    })

    return this.findOne(id)
  }

  delete(id: number) {
    const removedUser = this.findOne(id)

    this.users = this.users.filter(user => user.id !== id)

    return removedUser
  }
}
