import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

//Mail system setup
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
        port: Number(process.env.MAIL_TRANSPORT_PORT),
        host: process.env.MAIL_TRANSPORT_HOST,
        secure: true,
        ignoreTLS: true,
        auth: {
          user: process.env.MAIL_TRANSPORT_USER,
          pass: "",
        },
      },
      defaults: {
        from:process.env.MAIL_DEFAULT_FROM,
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {}