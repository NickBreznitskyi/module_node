import nodemailer from 'nodemailer';

import { config } from '../config';
import { emailActionEnum, emailInfo } from '../constants';

class EmailService {
    public async sendMail(userEmail: string, action: emailActionEnum) {
        const { subject, html } = emailInfo[action];
        const transport = nodemailer.createTransport({
            from: 'No reply',
            service: 'Gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        return transport.sendMail({
            to: userEmail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
