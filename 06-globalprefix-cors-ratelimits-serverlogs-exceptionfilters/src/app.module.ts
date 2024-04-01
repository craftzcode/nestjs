import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { EmployeesModule } from './employees/employees.module'

import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

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
    ])
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
