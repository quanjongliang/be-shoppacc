import {
  CreateAmountTransferredHistoryDto,
  CreateBuyAccountHistoryDto,
  CreateBuyMultiAccountHistoryDto,
  CreateChangeRoleHistoryDto,
  CreateConfirmHistoryDto,
  CreateCreateAuditHistoryDto,
} from "../dto";

export const getHistoryChangeRoleMessage = (
  historyChangeRole: CreateChangeRoleHistoryDto
): string => {
  const { admin, newRole, oldRole, username } = historyChangeRole;
  return `Admin ${admin} đổi quyển của tài khoản ${username} từ ${oldRole} sang ${newRole}`;
};

export const getHistoryAmountTransferredMessage = (
  historyAmountTransferrd: CreateAmountTransferredHistoryDto
): string => {
  const { admin, newMoney, oldMoney, username } = historyAmountTransferrd;
  return `Admin ${admin} thay đổi tiền của tài khoản ${username} từ ${oldMoney} thành ${newMoney}`;
};

export const getHistoryConfirmMessage = (
  historyConfirm: CreateConfirmHistoryDto
): string => {
  const { admin, UID, username } = historyConfirm;
  return `Admin ${admin} xác nhận giao dịch vào UID ${UID} của tài khoản ${username}`;
};

export const getHistoryCreateAuditMessage = (
  historyCreateAudit: CreateCreateAuditHistoryDto
): string => {
  const { UID, username } = historyCreateAudit;
  return `Tài khoản ${username} yêu cầu nạp vào ${UID}`;
};

export const getHistoryBuyAccountMessage = (
  historyBuyAccount: CreateBuyAccountHistoryDto
): string => {
  const { account, username } = historyBuyAccount;
  return `Tài khoản tên ${account.name} có id ${account.id} và mã ${account.code} đã được mua bởi người dùng ${username} với giá ${account.newPrice}`;
};

export const getHistoryBuyMultiAccountMessage = (
  historyBuyAccount: CreateBuyMultiAccountHistoryDto
): string => {
  const { accounts, username, cost } = historyBuyAccount;
  const listCode = accounts.map(({ code }) => code).join(",");
  return `Tài khoản code ${listCode} đã được mua bởi người dùng ${username} với giá ${cost}`;
};
