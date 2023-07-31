import { Module } from "@nestjs/common";
import { RegisterService } from "./register/register.service";
import { RegisterController } from "./register/register.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/users.entity";
import { JwtModule } from "@nestjs/jwt";
import { SigninService } from "./signin/signin.service";
import { SigninController } from "./signin/signin.controller";

@Module({
  controllers: [RegisterController, SigninController],
  providers: [RegisterService, SigninService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SESSION_SECRET || "secret",
      signOptions: {
        expiresIn: "24h",
      },
    }),
  ],
  exports: [RegisterService, SigninService, JwtModule],
})
export class AuthModule {}
