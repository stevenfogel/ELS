interface IUser {
  _id: any;
  email: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  state: string;
  zipCode: number;
  phoneNumber: number;
  secPhoneNumber: number;
  companyName: string;
  containers: Array<string|IOrder>
  isAdmin: boolean;
}
