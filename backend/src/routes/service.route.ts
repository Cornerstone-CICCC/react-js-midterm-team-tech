import { Router } from "express";
import serviceController from "../controllers/service.controller";

const serviceRouter = Router()

serviceRouter.post('/', serviceController.createService)
serviceRouter.put('/:id', serviceController.updateService)
serviceRouter.delete('/:id', serviceController.deleteService)

export default serviceRouter