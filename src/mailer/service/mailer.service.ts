import {
  DEFAULT_ACCOUNT_IMAGE,
  formatCurrencyVietNam,
  MAILER_CONFIG,
  NAME_APP_COMPANY,
} from "@/core";
import { Account, AuditInformation, TAG_TYPE } from "@/entity";
import { Injectable } from "@nestjs/common";
import { createTransport, Transporter } from "nodemailer";
import * as hbs from "nodemailer-express-handlebars";
import {
  MAILER_TEMPLATE_ENUM,
  SendAuditStoneMailInterface,
  SendBuyAccountMailInterface,
  SendBuyAccountsMailInterface,
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

  async sendBuyAccounts(
    information: SendBuyAccountsMailInterface,
    template = MAILER_TEMPLATE_ENUM.BUY_ACCOUNTS_BY_USER
  ) {
    const { to, username, accounts, cost } = information;
    const formattedAccountForMail = [...accounts].map((account) => {
      const server = account.tags.find(
        (tag) => tag.type === TAG_TYPE.SERVER
      ).title;
      const image =
        [...account.cloundinary].sort((a, b) => a.order - b.order)[0]?.url ||
        DEFAULT_ACCOUNT_IMAGE;
      return {
        name: account.name,
        ar: account.ar,
        server,
        image,
        price: formatCurrencyVietNam(+account.newPrice),
      };
    });
    const mailOptions = getMailOptions(to, template, {
      username,
      accounts: formattedAccountForMail,
      cost,
    });
    return this.transporter.sendMail(mailOptions);
  }
}
