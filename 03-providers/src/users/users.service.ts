import { Injectable } from '@nestjs/common'

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

  findAll(role?: 'USER' | 'ADMIN') {
    if (role) {
      return this.users.filter(user => user.role === role)
    }

    return this.users
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id)

    return user
  }

  create(user: {
    name: string
    username: string
    email: string
    password: string
    role: 'USER' | 'ADMIN'
  }) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)
    const newUser = { id: userByHighestId[0].id + 1, ...user }

    this.users.push(newUser)
    return newUser
  }

  update(
    id: number,
    //! We add (optional) to all property because when we updating our user sometimes we are not updating the all information
    updatedUser: {
      name?: string
      username?: string
      email?: string
      password?: string
      role?: 'USER' | 'ADMIN'
    }
  ) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return { ...user, ...updatedUser }
      }

      return user
    })

    //! After we update the (user) we return that (user)
    return this.findOne(id)
  }

  delete(id: number) {
    const removedUser = this.findOne(id)

    this.users = this.users.filter(user => user.id !== id)

    return removedUser
  }
}
