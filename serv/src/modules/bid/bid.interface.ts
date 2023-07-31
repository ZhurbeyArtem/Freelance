import { Bid } from "src/entities/bid.entity";
export interface IBid {
  bid: Bid,
  shortUser: {
    email: string,
    phoneNumber: string,
    rating: number,
    total: number,
    firstName: string
  }
}