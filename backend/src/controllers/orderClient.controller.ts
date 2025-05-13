import { Request, Response } from "express";
import { Order } from "../models/order.model";


//get order history
const getOrders = async (req: Request, res: Response) => {
   try {
      const orders = await Order.find().populate('userId').populate('serviceId')
      res.status(200).send(orders)
   } catch (err) {
      console.error(err)
      res.status(500).send({
         message: "Error loading orders"
      })
   }
}

//Create order
const orderService = async (req: Request , res: Response) => {
   try {
      const { userId, serviceId } = req.body
      const order = await Order.create({ userId, serviceId })
      res.status(201).send(order)
   } catch (error) {
      console.error(error)
      res.status(404).send({
         message: "Error creating order"
      })
   }
}

//update to paid
const paidOrder = async (req: Request<{ id: string }>, res: Response) => {
   try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
         new: true
      })
      if (!order) {
         res.status(404).send({
            message: "error on finding order"
         })
         return
      }
      res.status(200).send(order)
   } catch (error) {
      console.error(error)
      res.status(404).send({
         message: "error on updating order"
      })
   }
}
 
export default {
   orderService,
   getOrders,
   paidOrder
}