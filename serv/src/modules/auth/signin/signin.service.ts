import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SigninFormDto } from "../../dto/signin.user.dto";
import { User } from "../../../entities/users.entity";
import { getConnection, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { ISignIn } from "./signin.interface";
import { UsersService } from "src/modules/users/users.service";

require("dotenv").config();

@Injectable()
export class SigninService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async signInByEmail(dto: SigninFormDto): Promise<ISignIn | string> {
    try {
      const user = await this.validateUser(dto);

      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        cardNumber: user.cardNumber,
        id: user.id,
        userRole: user.userRole,
        token: await this.generateToken(user),
      };
    } catch (e) {
      throw new UnauthorizedException({
        message: e.message,
      });
    }
  }

  async validateUser(dto: SigninFormDto): Promise<User> {
    try {
      const user = await User.findOne({
        where: {
          email: dto.email,
        },
      });
      if (!user) {
        throw new UnauthorizedException({
          message: "Таку пошту не знайдено ",
        });
      }
      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (!isMatch)
        throw new UnauthorizedException({
          message: "Некоректний пароль ",
        });
      if (user && isMatch) {
        return user;
      }
    } catch (error) {
      throw new UnauthorizedException({
        message: error.message,
      });
    }
  }

  private async generateToken(user: User): Promise<string> {
    try {
      const payload = {
        email: user.email,
        phoneNumber: user.phoneNumber,
        id: user.id,
        userRole: user.userRole,
        firstName: user.firstName,
        lastName: user.lastName,
        cardnumber: user.cardNumber,
      };
      return this.jwtService.sign(payload);
    } catch (e) {
      return e;
    }
  }

  async updateUserPassword(formData, id): Promise<string> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } })
      const isMatch = await bcrypt.compare(formData.oldPassword, user.password);

      if (!isMatch)
        throw new UnauthorizedException({
          message: "Некоректний пароль ",
        });

      const hash = await bcrypt.hash(
        formData.newPassword,
        Number(process.env.SALT_OR_ROUNDS),
      );

      await this.usersRepository
        .createQueryBuilder()
        .update(User)
        .where({ id: id })
        .set({ password: hash })
        .execute();

      return "Пароль був оновлений.";

    } catch (e) {
      throw new UnauthorizedException({
        message: e.message,
      });
    }
  }
}
