export interface ISignIn {
  firstName: string;
  id: number;
  lastName: string;
  email: string;
  phoneNumber: string;
  cardNumber: string;
  userRole: string;
  token: string;
}

export interface changePassword {
  oldPassword: string;
  newPassword: string;
}