import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly emailStyles = `
    .container {
      background-color: #0f172a;
      color: #f8fafc;
      padding: 2rem;
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      background-color: #1e293b;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }
    .title {
      color: #f97316;
      font-size: 24px;
      margin: 0;
      text-align: center;
    }
    .content {
      background-color: #334155;
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }
    .button {
      background-color: #f97316;
      color: #ffffff;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      display: inline-block;
      margin: 1rem 0;
      font-weight: bold;
    }
    .button:hover {
      background-color: #ea580c;
    }
    .footer {
      color: #94a3b8;
      font-size: 14px;
      text-align: center;
      margin-top: 2rem;
    }
  `;

  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: this.configService.get('SMTP_SECURE'),
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASSWORD'),
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
  }

  async sendNewClientInvitation(email: string, token: string) {
    const invitationLink = `${this.configService.get(
      'FRONTEND_URL',
    )}/complete-registration?token=${token}`;

    await this.transporter.sendMail({
      from: this.configService.get('SMTP_FROM'),
      to: email,
      subject: 'Witamy w Fitlit - Załóż Firmę',
      html: `
        <style>${this.emailStyles}</style>
        <div class="container">
          <div class="header">
            <h1 class="title">Witamy w Fitlit!</h1>
          </div>
          <div class="content">
            <p>Zostałeś zaproszony do założenia firmy w systemie Fitlit.</p>
            <p>Aby rozpocząć, kliknij w poniższy przycisk:</p>
            <center>
              <a href="${invitationLink}" class="button">Załóż Firmę</a>
            </center>
            <p>Po rejestracji będziesz mógł:</p>
            <ul>
              <li>Skonfigurować profil swojej firmy</li>
              <li>Zaprosić pracowników</li>
              <li>Zarządzać uprawnieniami</li>
            </ul>
            <p>Link wygaśnie w ciągu 24 godzin.</p>
            <p>Jeśli nie spodziewałeś się tego zaproszenia, zignoruj tę wiadomość.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Fitlit. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      `,
    });
  }

  async sendCompanyMemberInvitation(
    email: string,
    token: string,
    companyName: string,
    inviterName: string,
  ) {
    const invitationLink = `${this.configService.get(
      'FRONTEND_URL',
    )}/complete-registration?token=${token}`;

    await this.transporter.sendMail({
      from: this.configService.get('SMTP_FROM'),
      to: email,
      subject: `Zaproszenie do ${companyName} w Fitlit`,
      html: `
        <style>${this.emailStyles}</style>
        <div class="container">
          <div class="header">
            <h1 class="title">Zaproszenie do Firmy</h1>
          </div>
          <div class="content">
            <p>Otrzymałeś zaproszenie do dołączenia do firmy <strong>${companyName}</strong> w systemie Fitlit.</p>
            <p><strong>${inviterName}</strong> zaprasza Cię do współpracy.</p>
            <p>Aby utworzyć konto i dołączyć do firmy, kliknij poniższy przycisk:</p>
            <center>
              <a href="${invitationLink}" class="button">Dołącz do ${companyName}</a>
            </center>
            <p>Link wygaśnie w ciągu 24 godzin.</p>
            <p>Jeśli nie spodziewałeś się tego zaproszenia, możesz je zignorować.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Fitlit. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      `,
    });
  }
}
