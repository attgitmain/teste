import { Router } from "express";
import isAuth from "../middleware/isAuth";
import isSuper from "../middleware/isSuper";
import * as CreditController from "../controllers/CreditController";

const creditRoutes = Router();

creditRoutes.get("/credits", isAuth, CreditController.getBalance);
creditRoutes.post("/credits/add", isAuth, isSuper, CreditController.addCredits);

export default creditRoutes;
