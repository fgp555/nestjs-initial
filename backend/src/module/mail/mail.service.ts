import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config as dotenvConfig } from 'dotenv';
import { MailDto } from './dtos/mail.dto';
dotenvConfig({ path: '.env' });

console.log('MailService-MAIL_HOST', process.env.MAIL_HOST);

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_PORT === '465', // true para 465, false para otros puertos
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail(body: MailDto) {
    const { to, subject, text, html } = body;
    const from = `"CREFI Fisioterapia Integral" <${process.env.MAIL_USER}>`;
    const mailOptions = { from, to, subject, text, html };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return info;
    } catch (error) {
      console.error('Error sending email: ', error);
    }
  }
}
