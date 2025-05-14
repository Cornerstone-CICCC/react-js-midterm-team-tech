import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
   userId: mongoose.Schema.Types.ObjectId;
   serviceId: mongoose.Schema.Types.ObjectId;
   serviceDate: Date;
   paidDate: null;
}

const OrderSchema:Schema = new Schema ({
   userId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "User"  },
   serviceId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "Service"  },
   serviceDate: { type: Date, default: Date.now },
   paidDate: { type: Date, default: null },
})

export const Order = mongoose.model<IOrder>('Order', OrderSchema)