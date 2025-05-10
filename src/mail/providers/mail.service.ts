import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(user: User): Promise<void> {
    const { email, firstName } = user;

    await this.mailerService.sendMail({
      to: email,
      from: 'noreply@nestjs-intro.com',
      subject: 'Welcome to our blog',
      template: './welcome',
      context: {
        name: firstName,
      },
    });
  }
}
