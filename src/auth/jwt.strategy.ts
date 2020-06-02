import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Repository } from "typeorm";
import { UserEntity } from "./../entities/user.entity";
import { IAuthPayload } from "./jwt-payload.interface";
import 'dotenv/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('token'),
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: IAuthPayload) {
    const { username } = payload;
    const user = await this._userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}


