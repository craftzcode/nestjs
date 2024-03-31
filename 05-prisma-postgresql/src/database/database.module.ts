import { Module } from '@nestjs/common'
import { DatabaseService } from './database.service'

@Module({
  providers: [DatabaseService],
  //! By exporting [DatabaseService], we make all methods inside accessible globally, not restricted to this module alone
  exports: [DatabaseService]
})
export class DatabaseModule {}
