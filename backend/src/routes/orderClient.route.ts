import { Router } from "express";
import orderClientController from "../controllers/orderClient.controller";

const orderRouter = Router()

orderRouter.get('/', orderClientController.getOrders)
orderRouter.post('/', orderClientController.orderService)
orderRouter.put('/:id', orderClientController.paidOrder)

export default orderRouter