import { Account, AuditInformation } from '@/entity';
import * as hbs from 'nodemailer-express-handlebars';
export declare const handlerbarOptions: hbs.NodemailerExpressHandlebarsOptions;
export declare class MailerService {
    private transporter;
    constructor();
    sendWelcomeMail(to: string, username: string): Promise<any>;
    sendResetPasswordMail(to: string, token: string, username: string): Promise<any>;
    sendSubmitMail(to: string, username: string, token: string): Promise<any>;
    sendAuditStoneMail(to: string, username: string, gameUsername: string, password: string, server: string, UID: string, auditInformation: AuditInformation[], total: number, note?: string): Promise<any>;
    sendBuyAccountFromUser(to: string, account: Account, username: string, listImage: string[]): Promise<any>;
}
