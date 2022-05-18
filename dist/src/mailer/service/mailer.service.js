"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = exports.handlerbarOptions = void 0;
const core_1 = require("../../core");
const common_1 = require("@nestjs/common");
const nodemailer_1 = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const interface_1 = require("../interface");
const util_1 = require("../util");
exports.handlerbarOptions = {
    viewEngine: {
        partialsDir: core_1.MAILER_CONFIG.TEMPLATE_DIR,
        defaultLayout: false,
    },
    viewPath: core_1.MAILER_CONFIG.TEMPLATE_DIR,
};
let MailerService = class MailerService {
    constructor() {
        this.transporter = (0, nodemailer_1.createTransport)({
            host: core_1.MAILER_CONFIG.HOST,
            port: core_1.MAILER_CONFIG.PORT,
            secure: core_1.MAILER_CONFIG.SECURE,
            auth: {
                user: core_1.MAILER_CONFIG.USER,
                pass: core_1.MAILER_CONFIG.PASS,
            },
        });
        this.transporter.use('compile', hbs(exports.handlerbarOptions));
    }
    async sendWelcomeMail(to, username) {
        const mailOptions = (0, util_1.getMailOptions)(to, interface_1.MAILER_TEMPLATE_ENUM.WELCOME, {
            username,
            company: core_1.NAME_APP_COMPANY,
        });
        return this.transporter.sendMail(mailOptions);
    }
    async sendResetPasswordMail(to, token, username) {
        const mailOptions = (0, util_1.getMailOptions)(to, interface_1.MAILER_TEMPLATE_ENUM.RESET_PASSWORD, { username, token, company: core_1.NAME_APP_COMPANY });
        return this.transporter.sendMail(mailOptions);
    }
    async sendSubmitMail(to, username, token) {
        const mailOptions = (0, util_1.getMailOptions)(to, interface_1.MAILER_TEMPLATE_ENUM.SUBMIT_USER, {
            username,
            token,
            company: core_1.NAME_APP_COMPANY,
        });
        return this.transporter.sendMail(mailOptions);
    }
    async sendAuditStoneMail(to, username, gameUsername, password, server, UID, auditInformation, total, note = '') {
        const mailOptions = (0, util_1.getMailOptions)(to, interface_1.MAILER_TEMPLATE_ENUM.AUDIT_STONE, {
            username,
            gameUsername,
            password,
            auditInformation,
            server,
            UID,
            note,
            total,
        });
        return this.transporter.sendMail(mailOptions);
    }
    async sendBuyAccountFromUser(to, account, username, listImage) {
        const mailOptions = (0, util_1.getMailOptions)(to, interface_1.MAILER_TEMPLATE_ENUM.BUY_ACCOUNT_BY_USER, {
            username,
            account,
            listImage,
        });
        return this.transporter.sendMail(mailOptions);
    }
};
MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailerService);
exports.MailerService = MailerService;
//# sourceMappingURL=mailer.service.js.map