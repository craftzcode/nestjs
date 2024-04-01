import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'

import { AllExceptionsFilter } from './all-exceptions.filter'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

  app.enableCors()
  //! Setting the global prefix (v1) for all routes (e.g., http://localhost:3000/v1/route)
  app.setGlobalPrefix('v1')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(3000)
}
bootstrap()
