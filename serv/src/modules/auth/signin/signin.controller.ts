require("isomorphic-fetch");
import {
  Controller,
  Body,
  Post,
  UseGuards,
  Patch,
  Req
} from "@nestjs/common";
import { SigninFormDto } from "../../dto/signin.user.dto";
import { SigninService } from "./signin.service";
import { ISignIn, changePassword } from "./signin.interface";
import { JwtAuthGuard } from "../jwt.auth.guard";


@Controller('auth/')
export class SigninController {
  constructor(private readonly SigninService: SigninService) {}

  @Post("signin")
  authorize(@Body() formData: SigninFormDto): Promise<ISignIn | string> {
    return this.SigninService.signInByEmail(formData);
  }


  @Patch("password")
  @UseGuards(JwtAuthGuard)
  update(@Body() formData: changePassword, @Req() req ): Promise<string> {
    return this.SigninService.updateUserPassword(formData, req.user.id);
  }
}
