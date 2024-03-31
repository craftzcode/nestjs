import { IsString, IsEmail, IsEnum, IsNotEmpty, IsAlpha } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsAlpha()
  name: string

  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsEnum(['USER', 'ADMIN'], {
    message: 'Valid role required'
  })
  role: 'USER' | 'ADMIN'
}
