import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EmployeesModule } from './employees/employees.module'
import { MyLoggerModule } from './my-logger/my-logger.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    PrismaModule,
    EmployeesModule,
    //! Setting up the (Rate Limiting)
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 60000,
        limit: 5
      },
      {
        name: 'long',
        ttl: 30000,
        limit: 5
      }
    ]),
    MyLoggerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //! Setting up the other configure for (Rate Limiting)
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
