import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { CreateVnPayDto } from "./dto";
import * as moment from "moment";
import { sortObject } from "./common";
import * as querystring from "qs";
import * as crypto from "crypto";
@Injectable()
export class VnPayService {
  createVnPay(vnpayDto: CreateVnPayDto) {
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
      vnp_OrderInfo: orderInfo,
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
    return vnpUrl;
  }
}
