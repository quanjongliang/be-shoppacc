"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpiredTime = exports.getMailOptions = void 0;
const core_1 = require("../../core");
const interface_1 = require("../interface");
const getMailOptions = (to, mailerTemplate, context) => {
    return {
        from: core_1.MAILER_CONFIG.FROM,
        to,
        subject: interface_1.MAILER_TEMPLATE[mailerTemplate].SUBJECT,
        template: interface_1.MAILER_TEMPLATE[mailerTemplate].TEMPLATE,
        context,
    };
};
exports.getMailOptions = getMailOptions;
const getExpiredTime = (expiresIn) => {
    const date = new Date();
    return new Date(date.getTime() + expiresIn * 60000);
};
exports.getExpiredTime = getExpiredTime;
//# sourceMappingURL=common.js.map