import { EXPIRES_IN_MINUTE } from '@/core';
import { MailContext, MailerOptions, MAILER_TEMPLATE_ENUM } from '../interface';
export declare const getMailOptions: (to: string, mailerTemplate: MAILER_TEMPLATE_ENUM, context: MailContext) => MailerOptions;
export declare const getExpiredTime: (expiresIn: EXPIRES_IN_MINUTE) => Date;
