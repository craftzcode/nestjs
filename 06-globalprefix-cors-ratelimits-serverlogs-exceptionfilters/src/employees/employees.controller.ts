import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { SkipThrottle, Throttle } from '@nestjs/throttler'

import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { EmployeesService } from './employees.service'
import { MyLoggerService } from 'src/my-logger/my-logger.service'

//! To skip the (Rate Limiting) entire this (EmployeesModule)
@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  //! (new MyLoggerService(EmployeesController.name)) Getting the name of (EmployeesController)
  private readonly logger = new MyLoggerService(EmployeesController.name)

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto)
  }

  //! To overwrite the (@SkipThrottle) we are not including this (findAll) on (@SkipThrottle)
  @SkipThrottle({ default: false })
  @Get()
  findAll(
    @Ip() ip: string,
    @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'
  ) {
    this.logger.log(`Request for ALL Employees\t${ip}`)
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
