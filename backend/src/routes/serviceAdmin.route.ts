import { Router } from "express";
import serviceController from "../controllers/serviceAdmin.controller";
import { upload } from '../middlewares/multerConfig';

const serviceRouter = Router()

serviceRouter.post('/', upload.single('avatar'), serviceController.createService)
serviceRouter.put('/:id', upload.single('avatar'), serviceController.updateService)
serviceRouter.delete('/:id', serviceController.deleteService)

export default serviceRouter