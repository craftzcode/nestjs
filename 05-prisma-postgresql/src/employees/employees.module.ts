import { Module } from '@nestjs/common'
import { EmployeesService } from './employees.service'
import { EmployeesController } from './employees.controller'
import { DatabaseModule } from 'src/database/database.module'

@Module({
  //! In (DatabaseModule), we export that module so we can import/access it in any module
  imports: [DatabaseModule],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule {}
