"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoryBuyAccountMessage = exports.getHistoryCreateAuditMessage = exports.getHistoryConfirmMessage = exports.getHistoryAmountTransferredMessage = exports.getHistoryChangeRoleMessage = void 0;
const getHistoryChangeRoleMessage = (historyChangeRole) => {
    const { admin, newRole, oldRole, username } = historyChangeRole;
    return `Admin ${admin} đổi quyển của tài khoản ${username} từ ${oldRole} sang ${newRole}`;
};
exports.getHistoryChangeRoleMessage = getHistoryChangeRoleMessage;
const getHistoryAmountTransferredMessage = (historyAmountTransferrd) => {
    const { admin, newMoney, oldMoney, username } = historyAmountTransferrd;
    return `Admin ${admin} thay đổi tiền của tài khoản ${username} từ ${oldMoney} thành ${newMoney}`;
};
exports.getHistoryAmountTransferredMessage = getHistoryAmountTransferredMessage;
const getHistoryConfirmMessage = (historyConfirm) => {
    const { admin, UID, username } = historyConfirm;
    return `Admin ${admin} xác nhận giao dịch vào UID ${UID} của tài khoản ${username}`;
};
exports.getHistoryConfirmMessage = getHistoryConfirmMessage;
const getHistoryCreateAuditMessage = (historyCreateAudit) => {
    const { UID, username } = historyCreateAudit;
    return `Tài khoản ${username} yêu cầu nạp vào ${UID}`;
};
exports.getHistoryCreateAuditMessage = getHistoryCreateAuditMessage;
const getHistoryBuyAccountMessage = (historyBuyAccount) => {
    const { account, username } = historyBuyAccount;
    return `Tài khoản tên ${account.name} có id ${account.id} đã được mua bởi người dùng ${username} với giá ${account.newPrice}`;
};
exports.getHistoryBuyAccountMessage = getHistoryBuyAccountMessage;
//# sourceMappingURL=ulti.js.map