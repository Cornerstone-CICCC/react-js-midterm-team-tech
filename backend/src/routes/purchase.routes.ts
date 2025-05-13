import { Router } from "express";
import purchaseController from "../controllers/purchase.controller";

const purchaseRouter = Router();

purchaseRouter.post('/create-checkout-session', purchaseController.createCheckoutSession);

export { purchaseRouter };