import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //! Middleware to handle validation for all routes globally
  //! (whitelist: true) allows fields not included in DTOs (e.g., createdAt or updatedAt) when sending requests to API endpoints
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(3000)
}
bootstrap()
