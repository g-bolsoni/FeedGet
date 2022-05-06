import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail.adapter";


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "79e2940eacf328",
      pass: "45d7bd93420f80"
    }
});
export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData){
         await transport.sendMail({
            from: 'Equipe FeedGet <oi@feedget.com>',
            to: 'Giovane Souza <giovanebolsoni2@gmail.com>',
            subject,
            html: body,
        })
    }
}