"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenExpired = void 0;
const isTokenExpired = (expiredTime) => {
    const timeExpired = new Date(expiredTime);
    const today = new Date();
    return today.getTime() > timeExpired.getTime();
};
exports.isTokenExpired = isTokenExpired;
//# sourceMappingURL=common.js.map