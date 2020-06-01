import {IsEmail, IsString, MinLength, MaxLength} from 'class-validator';

export class LoginDto{
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;
  
  @IsString()
  @MinLength(4)
  password: string;
}

export class RegisterDto extends LoginDto {
  
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  username: string;
}
