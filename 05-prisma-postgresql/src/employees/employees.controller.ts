import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common'
import { EmployeesService } from './employees.service'
import { Prisma } from '@prisma/client'

import { UpdateUserDto } from './dto/update-employee.dto'
import { CreateEmployeeDto } from './dto/create-employee.dto'

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(
    //! We use (Prisma.EmployeeCreateInput) instead of (CreateUserDto) because we are utilizing (Prisma) for our (Employees)
    @Body() createEmployeeDto: CreateEmployeeDto
  ) {
    return this.employeesService.create(createEmployeeDto)
  }

  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.employeesService.findAll(role)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    //! We use (Prisma.EmployeeUpdateInput) instead of (UpdateUserDto) because we are utilizing (Prisma) for our (Employees)
    @Body() updateEmployeeDto: UpdateUserDto
  ) {
    return this.employeesService.update(+id, updateEmployeeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id)
  }
}
