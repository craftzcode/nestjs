import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  //! Setting the global prefix (v1) for all routes (e.g., http://localhost:3000/v1/route)
  app.setGlobalPrefix('v1')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(3000)
}
bootstrap()
