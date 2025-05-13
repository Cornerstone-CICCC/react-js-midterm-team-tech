import mongoose, {Schema, Document} from "mongoose";

export interface IService extends Document {
   avatar: string,
   name: string,
   height: number,
   age: number,
   nationality: string,
   self_introduction: string,
   price: number,
   available_time: string,
   price_id: string,
}

const serviceSchema: Schema = new Schema({
   avatar: { type: String, required: true },
   name: { type: String, required: true },
   height: { type: Number, required: true },
   age: { type: Number, required: true },
   nationality: { type: String, required: true },
   self_introduction: { type: String, required: true },
   price: { type: Number, required: true },
   available_time: { type: String, required: true },
   price_id: {type: String, required: true}
})

export const Service = mongoose.model<IService>("Service", serviceSchema)