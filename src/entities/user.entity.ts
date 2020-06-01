import { Entity, Column, BeforeInsert } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { IsEmail } from 'class-validator';
import { Exclude, classToPlain } from 'class-transformer';
import { genSalt, hash, compare } from "bcryptjs";
@Entity('users')
export class UserEntity extends AbstractEntity {

  @Column({unique: true})
  @IsEmail()
  email: string;
  
  @Column()
  username: string;
  
  @Column({default: ''})
  bio: string;

  @Column({default: null, nullable: true})
  image: string | null;
  
  
  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword(){
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }

  async comparePassword(password: string){
    return await compare(password, this.password);
  }

  toJSON(){
    return classToPlain(this);
  }
}