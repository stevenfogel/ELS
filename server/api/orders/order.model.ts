import * as mongoose from "mongoose";

export interface IOrderModel extends IOrder, mongoose.Document{}

let orderSchema = new mongoose.Schema({
  date: {type: String, required: true},
  containerType: {type: String, required: true},
  quantity: {type: Number, required: true},
  status: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

export let Order = mongoose.model<IOrderModel>('Order', orderSchema);
