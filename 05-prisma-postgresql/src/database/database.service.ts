import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
//! Extending (PrismaClient) to utilize Prisma Types
export class DatabaseService extends PrismaClient implements OnModuleInit {
  //! By implementing async/await for Prisma Client initialization, we eliminate the need for await in our methods/queries
  async onModuleInit() {
    await this.$connect()
  }
}
