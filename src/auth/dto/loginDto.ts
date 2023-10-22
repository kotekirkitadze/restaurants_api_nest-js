import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Please Provide email',
    },
  )
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
