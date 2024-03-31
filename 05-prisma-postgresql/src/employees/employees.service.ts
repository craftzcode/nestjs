import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service'

import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateUserDto } from './dto/update-employee.dto'

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    //! Utilizing (Prisma) queries through (DatabaseService) to create data
    //! Asynchronous behavior is handled implicitly by (DatabaseService / PrismaClient), so we don't need 'await'
    return this.databaseService.employee.create({
      data: createEmployeeDto
    })
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    //! Utilizing (Prisma) queries through (DatabaseService) to find all data
    //! Asynchronous behavior is handled implicitly by (DatabaseService / PrismaClient), so we don't need 'await'
    if (role) {
      const roleArray = await this.databaseService.employee.findMany({
        where: {
          role
        }
      })

      if (roleArray.length === 0)
        throw new NotFoundException('Employee role does not exist.')

      return roleArray
    }

    return this.databaseService.employee.findMany()
  }

  async findOne(id: number) {
    //! Utilizing (Prisma) queries through (DatabaseService) to find a single data
    //! Asynchronous behavior is handled implicitly by (DatabaseService / PrismaClient), so we don't need 'await'
    const employee = await this.databaseService.employee.findUnique({
      where: {
        id
      }
    })

    if (!employee) throw new NotFoundException('Employee does not exist.')

    return employee
  }

  async update(id: number, updateEmployeeDto: UpdateUserDto) {
    //! Utilizing (Prisma) queries through (DatabaseService) to update a single data
    //! Asynchronous behavior is handled implicitly by (DatabaseService / PrismaClient), so we don't need 'await'
    return this.databaseService.employee.update({
      where: { id },
      data: updateEmployeeDto
    })

    // const employee = await this.databaseService.employee.update({
    //   where: { id },
    //   data: updateEmployeeDto
    // })

    // if (!employee) throw new NotFoundException('Employee does not exist.')

    // return employee
  }

  async remove(id: number) {
    //! Utilizing (Prisma) queries through (DatabaseService) to delete a single data
    //! Asynchronous behavior is handled implicitly by (DatabaseService / PrismaClient), so we don't need 'await'
    return this.databaseService.employee.delete({
      where: {
        id
      }
    })
  }
}
