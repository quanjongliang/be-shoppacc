"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsMatchPassword = exports.hashedPassword = void 0;
const bcrypt = require("bcrypt");
const SALT_OR_ROUNDS = 10;
const hashedPassword = (password) => {
    return bcrypt.hash(password, SALT_OR_ROUNDS);
};
exports.hashedPassword = hashedPassword;
const checkIsMatchPassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
exports.checkIsMatchPassword = checkIsMatchPassword;
//# sourceMappingURL=bcrypt.js.map