import { Router } from "express";
import serviceClientController from "../controllers/serviceClient.controller";

const clientRouter = Router()

clientRouter.get('/', serviceClientController.getAllServiceList)
clientRouter.get('/:id', serviceClientController.getServiceById)

export default clientRouter