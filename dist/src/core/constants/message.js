"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPIRES_IN_MINUTE = exports.HISTORY_MESSAGE = exports.AUDIT_MESSAGE = exports.ACCOUNT_MESSAGE = exports.TAG_MESSAGE = exports.POST_MESSAGE = exports.AUTH_MESSAGE = exports.DRIVER_MESSAGE = void 0;
exports.DRIVER_MESSAGE = {
    REMOVE: {
        SUCCESS: 'Remove image successfully',
    },
};
exports.AUTH_MESSAGE = {
    USER: {
        NOT_FOUND: 'Tài khoản không tồn tại!',
        EXIST: 'Tài khoản đã tồn tại!',
        CONFIRM_PASSWORD: 'Mật khẩu phải trùng nhau!',
        WRONG_PASSWORD: 'Sai mật khẩu!',
        SUBMITTED: 'Xác thực tài khoản thành công!',
        ROLE: 'Người dùng không đủ quyền hạn!',
        UNAUTHORIZED: 'Bạn cần đăng nhập để sử dụng tính năng này!',
        WRONG: 'Tài khoản hoặc mật khẩu không chính xác!',
    },
    TOKEN: {
        EXPIRED: 'Yêu cầu đã hết hạn!',
    },
};
exports.POST_MESSAGE = {
    DELETE: 'Xoá bài đăng thành công!',
    NOT_FOUND: 'Bài đăng không tồn tại!',
};
exports.TAG_MESSAGE = {
    CONFLICT: 'Tag đã tồn tại!',
};
exports.ACCOUNT_MESSAGE = {
    NOT_FOUND: 'Tài khoản không tồn tại!',
    SOLD: 'Tài khoản đã bán!',
};
exports.AUDIT_MESSAGE = {
    STATUS_NOT_FOUND: 'Đơn nạp đã được hoàn thành!',
    NOT_ENOUGH: 'Tài khoản không đủ tiền để thực hiện giao dịch!',
};
exports.HISTORY_MESSAGE = {
    NOT_FOUND: 'Giao dịch chưa được thực hiện, vui lòng thử lại sau.',
};
var EXPIRES_IN_MINUTE;
(function (EXPIRES_IN_MINUTE) {
    EXPIRES_IN_MINUTE[EXPIRES_IN_MINUTE["FIVE_MINUTE"] = 5] = "FIVE_MINUTE";
    EXPIRES_IN_MINUTE[EXPIRES_IN_MINUTE["THIRTY_MINUTE"] = 30] = "THIRTY_MINUTE";
})(EXPIRES_IN_MINUTE = exports.EXPIRES_IN_MINUTE || (exports.EXPIRES_IN_MINUTE = {}));
//# sourceMappingURL=message.js.map