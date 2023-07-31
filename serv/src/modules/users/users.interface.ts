import { User } from "src/entities/users.entity";

export interface updateData {
  firtName: string;
  lastName: string;
  phoneNumber: string;
  cardNumber: string;
}

export interface IUser {
  user: User;
  rating: number;
  total: number;
}