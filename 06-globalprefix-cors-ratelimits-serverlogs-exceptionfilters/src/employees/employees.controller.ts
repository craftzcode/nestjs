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
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { SkipThrottle, Throttle } from '@nestjs/throttler'

//! To skip the (Rate Limiting) entire this (EmployeesModule)
@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto)
  }

  //! To overwrite the (@SkipThrottle) we are not including this (findAll) on (@SkipThrottle)
  @SkipThrottle({ default: false })
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.employeesService.findAll(role)
  }

  //! To overwrite the (Rate Limiting) on the (short) config
  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeesService.update(+id, updateEmployeeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id)
  }
}
