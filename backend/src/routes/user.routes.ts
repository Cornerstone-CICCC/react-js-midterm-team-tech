import { Router } from "express";
import userController from "../controllers/user.controller";

const publicRouter = Router();
const protectedRouter = Router();

publicRouter.post('/signup', userController.signUp);
publicRouter.post('/login', userController.login);
publicRouter.post('/logout', userController.logout);
protectedRouter.get('/:id', userController.getUserById)
protectedRouter.put('/:id', userController.editUserProfile)

export { publicRouter, protectedRouter };