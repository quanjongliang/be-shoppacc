import { MAILER_CONFIG, NAME_APP_COMPANY } from "@/core";
import { Account, AuditInformation } from "@/entity";
import { Injectable } from "@nestjs/common";
import { createTransport, Transporter } from "nodemailer";
import * as hbs from "nodemailer-express-handlebars";
import {
  MAILER_TEMPLATE_ENUM,
  SendAuditStoneMailInterface,
  SendBuyAccountMailInterface,
  SendTokenMailInterface,
  SendWelcomeMailInterface,
} from "../interface";
import { getMailOptions } from "../util";

export const handlerbarOptions: hbs.NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: MAILER_CONFIG.TEMPLATE_DIR,
    defaultLayout: false,
  },
  viewPath: MAILER_CONFIG.TEMPLATE_DIR,
};

@Injectable()
export class MailerService {
  private transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      host: MAILER_CONFIG.HOST,
      port: MAILER_CONFIG.PORT,
      secure: MAILER_CONFIG.SECURE,
      auth: {
        user: MAILER_CONFIG.USER,
        pass: MAILER_CONFIG.PASS,
      },
    });
    this.transporter.use("compile", hbs(handlerbarOptions));
  }

  async sendWelcomeMail(information: SendWelcomeMailInterface) {
    const { to, username } = information;
    const mailOptions = getMailOptions(to, MAILER_TEMPLATE_ENUM.WELCOME, {
      username,
      company: NAME_APP_COMPANY,
    });
    return this.transporter.sendMail(mailOptions);
  }

  async sendResetPasswordMail(information: SendTokenMailInterface) {
    const { to, username, token } = information;
    const mailOptions = getMailOptions(
      to,
      MAILER_TEMPLATE_ENUM.RESET_PASSWORD,
      { username, token, company: NAME_APP_COMPANY }
    );
    return this.transporter.sendMail(mailOptions);
  }

  async sendSubmitMail(information: SendTokenMailInterface) {
    const { to, username, token } = information;
    const mailOptions = getMailOptions(to, MAILER_TEMPLATE_ENUM.SUBMIT_USER, {
      username,
      token,
      company: NAME_APP_COMPANY,
    });
    return this.transporter.sendMail(mailOptions);
  }

  async sendAuditStoneMail(
    information: SendAuditStoneMailInterface,
    template = MAILER_TEMPLATE_ENUM.AUDIT_STONE
  ) {
    const {
      to,
      username,
      gameUsername,
      password,
      auditInformations,
      server,
      UID,
      total,
      note = "",
    } = information;
    const mailOptions = getMailOptions(to, template, {
      username,
      gameUsername,
      password,
      auditInformations,
      server,
      UID,
      note,
      total,
    });
    return this.transporter.sendMail(mailOptions);
  }

  async sendBuyAccountFromUser(
    information: SendBuyAccountMailInterface,
    template = MAILER_TEMPLATE_ENUM.BUY_ACCOUNT_BY_USER
  ) {
    const { to, username, account, listImage } = information;
    const mailOptions = getMailOptions(to, template, {
      username,
      account,
      listImage,
    });
    return this.transporter.sendMail(mailOptions);
  }
}
