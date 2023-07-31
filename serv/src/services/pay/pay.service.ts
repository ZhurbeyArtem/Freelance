import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import * as qrcode from "qrcode";

@Injectable()
export class PayService {
  async generateQr(cardNumber): Promise<object> {
    try {
      return await qrcode.toDataURL(cardNumber);
    } catch (e) {
      throw new HttpException(
        "Oops some happening wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
