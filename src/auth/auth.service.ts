import { Injectable, InternalServerErrorException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './../entities/user.entity';
import { RegisterDto, LoginDto } from './../models/user.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) { }

  async register(credenciales: RegisterDto) {
    try {
      const user = this._userRepository.create(credenciales);
      await user.save();
      return user;
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
      if (user && (await user.comparePassword(password))) {
        return user;
      }
      throw new UnauthorizedException('Invalido las credenciales');
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
