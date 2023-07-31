import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from 'src/entities/users.entity';
import { CreateUserDto } from '../../dto/create.user.dto';

@Injectable()
export class RegisterService {
  constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
      private readonly jwtService: JwtService,
  ) {}

  async registration(dto: CreateUserDto) {
    try {
      let candidate = await this.getUserByEmail(dto.email);
      if (candidate) {
        throw new HttpException(
            'Користувач з подібною поштую вже зареєстровний ',
            HttpStatus.BAD_REQUEST,
        );
      }
      candidate = await this.getUserByPhone(dto.phoneNumber);
      if (candidate) {
        throw new HttpException(
            'Користувач з подібним номером телефону вже зареєстровний ',
            HttpStatus.BAD_REQUEST,
        );
      }
      const hashPassword = await bcrypt.hash(
          dto.password,
          Number(process.env.SALT_OR_ROUNDS),
      );
      const user = await this.usersRepository.save({
        ...dto,
        password: hashPassword,
      });
      return this.generateToken(user);
    } catch (e) {
      return e;
    }
  }

  async generateToken(user: User) {
    const payload = {
      email: user.email,
      phoneNumber: user.phoneNumber,
      id: user.id,
      userRole: user.userRole,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      return user;
    } catch (e) {
      return '' + e;
    }
  }

  async getUserByPhone(phoneNumber: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { phoneNumber },
      });
      return user;
    } catch (e) {
      return '' + e;
    }
  }
}