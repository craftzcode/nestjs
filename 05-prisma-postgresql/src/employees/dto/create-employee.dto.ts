import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator'

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'])
  role: 'INTERN' | 'ENGINEER' | 'ADMIN'
}
