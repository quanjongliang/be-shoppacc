"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAILER_TEMPLATE = exports.MAILER_TEMPLATE_ENUM = void 0;
var MAILER_TEMPLATE_ENUM;
(function (MAILER_TEMPLATE_ENUM) {
    MAILER_TEMPLATE_ENUM["WELCOME"] = "WELCOME";
    MAILER_TEMPLATE_ENUM["RESET_PASSWORD"] = "RESET_PASSWORD";
    MAILER_TEMPLATE_ENUM["SUBMIT_USER"] = "SUBMIT_USER";
    MAILER_TEMPLATE_ENUM["AUDIT_STONE"] = "AUDIT_STONE";
    MAILER_TEMPLATE_ENUM["BUY_ACCOUNT_BY_USER"] = "BUY_ACCOUNT_BY_USER";
})(MAILER_TEMPLATE_ENUM = exports.MAILER_TEMPLATE_ENUM || (exports.MAILER_TEMPLATE_ENUM = {}));
exports.MAILER_TEMPLATE = {
    WELCOME: {
        TEMPLATE: 'welcome-mail',
        SUBJECT: 'Welcome!',
    },
    RESET_PASSWORD: {
        TEMPLATE: 'reset-password-mail',
        SUBJECT: 'Reset password!',
    },
    SUBMIT_USER: {
        TEMPLATE: 'submit-user-mail',
        SUBJECT: 'Submit user!',
    },
    AUDIT_STONE: {
        TEMPLATE: 'request-stone-mail',
        SUBJECT: 'Request Stone',
    },
    BUY_ACCOUNT_BY_USER: {
        TEMPLATE: 'buy-account-by-user',
        SUBJECT: 'Buy account',
    },
};
//# sourceMappingURL=mail.interface.js.map