import { formatCurrencyVietNam } from "@/core";
import { TAG_TYPE } from "@/entity";
import {
  CreateAmountTransferredHistoryDto,
  CreateBuyAccountHistoryDto,
  CreateBuyMultiAccountHistoryDto,
  CreateChangeRoleHistoryDto,
  CreateConfirmAccountBuyedHistoryDto,
  CreateConfirmHistoryDto,
  CreateCreateAuditHistoryDto,
  CreateRefundAccountHistoryDto,
  CreateTransactionHistoryDto,
  CreateVnPayHistoryDto,
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
  return `Tài khoản tên ${account.name} có id ${account.id} và mã ${
    account.code
  } đã được mua bởi người dùng ${username} với giá ${formatCurrencyVietNam(
    account.newPrice
  )}`;
};

export const getHistoryBuyMultiAccountMessage = (
  historyBuyAccount: CreateBuyMultiAccountHistoryDto
): string => {
  const { accounts, username, cost } = historyBuyAccount;
  const listCode = accounts.map(({ code,tags }) => `${code} ( game: ${tags.find(tag=>tag.type===TAG_TYPE.GAME).title})`).join(",");
  return `Tài khoản code ${listCode} đã được mua bởi người dùng ${username} với giá ${formatCurrencyVietNam(
    cost
  )}`;
};

export const getHistoryRefundAccountMessage = (
  historyRefundAccount: CreateRefundAccountHistoryDto
): string => {
  const { account, user, boughtBy } = historyRefundAccount;
  const now = new Date();
  return `User ${user.username} đã đặt lại trạng thái của tài khoản ${
    account.name
  } (game: ${account.tags.find(tag=>tag.type === TAG_TYPE.GAME).title} )thành còn hàng và hoàn lại ${formatCurrencyVietNam(
    account.newPrice
  )} cho User ${boughtBy} vào lúc ${now.toLocaleDateString(
    "vi-VN"
  )} ${now.toLocaleTimeString()}`;
};

export const getHistoryConfirmBuyAccountMessage = (
  historyConfimBuyAccount: CreateConfirmAccountBuyedHistoryDto
): string => {
  const { admin, total, user } = historyConfimBuyAccount;
  return `Admin ${admin} xác nhận giao dịch tổng giá ${formatCurrencyVietNam(
    +total
  )} của tài khoản ${user.username}`;
};

export const getHistoryVnPayMessage = (
  historyVnpay: CreateVnPayHistoryDto,
  isSuccess: boolean
): string => {
  const { user, vnp_Amount, vnp_BankTranNo } = historyVnpay;
  return `Người dùng ${user.username} nạp ${
    isSuccess ? "" : " không "
  } thành công ${formatCurrencyVietNam(
    vnp_Amount
  )} bằng VnPay với mã giao dịch: ${vnp_BankTranNo}`;
};

export const getHistoryTransactionMessage = (
  historyTransaction: CreateTransactionHistoryDto
): string => {
  const { user, amount, description, transactionID } = historyTransaction;
  return `Nguời dùng ${user.username} nạp tiền thành công: \n
  Số tiền: ${amount} VND, \n
  Nội dung: ${description}, \n
  Mã giao dịch: ${transactionID}
  `;
};
