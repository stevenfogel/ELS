interface IOrder {
  _id: any;
  date: string;
  containerType: string;
  quantity: number;
  creator: string | IUser;
  status: string;
}
