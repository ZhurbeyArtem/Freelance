import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "src/entities/users.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPasswordMail(email: string, request) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        const session_id = uuidv4();
        request.session[`passwordReset${session_id}`] = {
          session_id: session_id,
          session_name: 'reset-user-password',
          user_email: email,
          expires: new Date(Date.now() + 1800000),
          maxAge: 1800000,
        };

        this.mailerService.sendMail({
          to: `${email}`,
          from: process.env.MAIL_DEFAULT_FROM,
          subject: 'Hello!',
          text: 'Use this password',
          html: `<div>
                <h1>Hello ${email}!</h1>
                <p>A request has been received to change the password for your account.</p>
                <a href="http://localhost:3000/change-password/${session_id}" target="_blank">
                  <button>Reset password</button>
                </a>
              </div>`,
        });
        return 'Mail successfully sent.';
      }
      throw "Email not registered.";
    } catch (error) {
      return error;
    }
  }
}
