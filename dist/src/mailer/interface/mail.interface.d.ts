import { Account, AuditInformation } from '@/entity';
import { TemplateOptions } from 'nodemailer-express-handlebars';
export declare enum MAILER_TEMPLATE_ENUM {
    WELCOME = "WELCOME",
    RESET_PASSWORD = "RESET_PASSWORD",
    SUBMIT_USER = "SUBMIT_USER",
    AUDIT_STONE = "AUDIT_STONE",
    BUY_ACCOUNT_BY_USER = "BUY_ACCOUNT_BY_USER"
}
export declare const MAILER_TEMPLATE: MailerTemplateInterface;
export interface MailerTemplateInterface {
    [key: string]: {
        TEMPLATE: string;
        SUBJECT: string;
    };
}
export interface WelcomeMailContext {
    username: string;
    company: string;
}
export interface ResetPasswordMailContext {
    username: string;
    token: string;
    company: string;
}
export interface SubmitUserMailContext {
    username: string;
    token: string;
    company: string;
}
export interface RequestStoneMailContext {
    username: string;
    gameUsername: string;
    password: string;
    server: string;
    UID: string;
    note: string;
    total: number;
    auditInformation: AuditInformation[];
}
export interface ByAccountByUserContext {
    username: string;
    account: Account;
    listImage: string[];
}
export declare type MailContext = WelcomeMailContext | ResetPasswordMailContext | SubmitUserMailContext | RequestStoneMailContext | ByAccountByUserContext;
export interface MailerOptions extends TemplateOptions {
    from: string;
    to: string;
    subject: string;
}
