import { Controller, Post, Body, Req } from '@nestjs/common';
import { MailService } from "./mail.service";

@Controller()
export class MailController {
    constructor(
        private mailService: MailService
    ) {}

    @Post('mail/send-reset-password-mail')
        send(@Body() data, @Req() request){
            return this.mailService.sendResetPasswordMail(data.email, request)
        }
}
