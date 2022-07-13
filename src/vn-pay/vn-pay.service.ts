import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateVnPayDto, VnpQueryDto } from "./dto";
import * as moment from "moment";
import { sortObject, VN_PAY_MESSAGE } from "./common";
import * as querystring from "qs";
import * as crypto from "crypto";
import {
  HistoryRepository,
  UserRepository,
  VnPayRepository,
} from "@/repository";
import {
  HISTORY_TYPE,
  User,
  VN_PAY_RELATION,
  VN_PAY_STATUS,
  VN_PAY_SUCCESS_RESPONSE,
} from "@/entity";
import { Connection } from "typeorm";
import { AUTH_MESSAGE } from "@/core";
import { getHistoryVnPayMessage } from "@/history";
@Injectable()
export class VnPayService {
  constructor(
    private vnPayRepository: VnPayRepository,
    private connection: Connection,
    private userRepository: UserRepository,
    private historyRepository: HistoryRepository
  ) {}
  async createVnPay(vnpayDto: CreateVnPayDto, user: User) {
    let vnpUrl = process.env.VNP_URL;
    const date = new Date();
    const createdDate = moment(date).format("yyyyMMDDHHmmss");
    const orderId = moment(date).format("HHmmss");
    const {
      amount,
      bankCode,
      ipAddress,
      language = "vn",
      orderInfo,
      orderType,
    } = vnpayDto;

    const unformatedVnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: process.env.VNP_TMN_CODE,
      vnp_Locale: language,
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `User: ${user.username} \n ${orderInfo}`,
      vnp_OrderType: orderType,
      vnp_Amount: amount * 100,
      vnp_IpAddr: ipAddress,
      vnp_CreateDate: createdDate,
      vnp_BankCode: bankCode,
      vnp_ReturnUrl: process.env.VNP_RETURN_URL,
    };
    const vnp_Params = sortObject(unformatedVnp_Params);
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", process.env.VNP_HASH_SECRET);
    const signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    await this.vnPayRepository.save(
      this.vnPayRepository.create({ ...vnp_Params, user })
    );
    return vnpUrl;
  }

  async returnVnPay(vnPayParams: VnpQueryDto) {
    const unformattedVnpParams = vnPayParams;
    const { vnp_SecureHash, vnp_TmnCode, vnp_Amount, vnp_BankTranNo } =
      unformattedVnpParams;
    delete unformattedVnpParams["vnp_SecureHash"];
    delete unformattedVnpParams["vnp_SecureHashType"];
    const vnp_Params = sortObject(unformattedVnpParams);
    const serverVnpTmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_HASH_SECRET;
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    return this.connection.transaction(async () => {
      if (vnp_SecureHash === signed && vnp_TmnCode === serverVnpTmnCode) {
        const { vnp_ResponseCode, vnp_TxnRef } = vnPayParams;
        delete vnPayParams["vnp_TxnRef"];
        delete vnPayParams["vnp_Amount"];
        const vnPay = await this.vnPayRepository.findOne({
          where: { vnp_TxnRef },
          relations: [VN_PAY_RELATION.USER],
        });
        if (!vnPay) throw new NotFoundException(VN_PAY_MESSAGE.NOT_FOUND);
        if (vnPay.status !== VN_PAY_STATUS.PENDING)
          throw new BadRequestException(VN_PAY_MESSAGE.NOT_PENDING);
        const extractlyVnpAmount = +vnp_Amount / 100;
        await this.vnPayRepository.save({
          ...vnPay,
          ...vnPayParams,
          vnp_Amount: +extractlyVnpAmount,
          status:
            vnp_ResponseCode === VN_PAY_SUCCESS_RESPONSE
              ? VN_PAY_STATUS.SUCCESS
              : VN_PAY_STATUS.FAILED,
        });
        const { user } = vnPay;
        if (!user) throw new NotFoundException(AUTH_MESSAGE.USER.NOT_FOUND);
        const history = getHistoryVnPayMessage(
          {
            user,
            vnp_Amount: +extractlyVnpAmount,
            vnp_BankTranNo,
          },
          vnp_ResponseCode === VN_PAY_SUCCESS_RESPONSE
        );
        if (vnp_ResponseCode === VN_PAY_SUCCESS_RESPONSE) {
          user.money = +user.money + extractlyVnpAmount;
          await this.userRepository.save(user);
        }
        await this.historyRepository.saveNewHistory(
          history,
          HISTORY_TYPE.VN_PAY,
          JSON.stringify(vnPayParams)
        );
        return vnp_ResponseCode === VN_PAY_SUCCESS_RESPONSE
          ? VN_PAY_STATUS.SUCCESS
          : VN_PAY_STATUS.FAILED;
      }
      throw new BadRequestException(VN_PAY_MESSAGE.IN_VALID);
    });
  }
}
