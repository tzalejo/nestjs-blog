import { Injectable, InternalServerErrorException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './../entities/user.entity';
import { RegisterDto, LoginDto } from './../models/user.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
    private readonly _jwtService: JwtService,
  ) { }

  async register(credenciales: RegisterDto) {
    try {
      const user = this._userRepository.create(credenciales);
      await user.save();
      // generamos token
      const payload = { username: user.username };
      const token = this._jwtService.sign(payload);
      return {user: {...user.toJSON(), token} };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email ya esta registrado');
      }
      throw new InternalServerErrorException();
    }
  }

  async login({email, password}: LoginDto) {
    try {
      const user = await this._userRepository.findOne({where: { email } });
      const isValido = await user.comparePassword(password);
      if (!isValido ) {
        throw new UnauthorizedException('Invalido las credenciales');
      }
      // generamos token
      const payload = { username: user.username };
      const token = this._jwtService.sign(payload);
      return {user: {...user.toJSON(), token} };
    } catch (error) {
      throw new UnauthorizedException('Invalido las credenciales');
    }
  }
}
