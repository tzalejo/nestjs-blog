import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from '../models/user.dto';
@Controller('users')
export class AuthController {

  constructor(
    private readonly _authService: AuthService,
  ){}

  @Post()
  register(
    @Body(ValidationPipe) credenciales: RegisterDto
  ) {
    return this._authService.register(credenciales);
  }

  @Post('/login')
  login(
    @Body(ValidationPipe) credenciales: LoginDto
  ) {
    return this._authService.login(credenciales);
  }

}
