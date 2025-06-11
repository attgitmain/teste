import { Router } from "express";
import isAuth from "../middleware/isAuth";
import * as MaturationController from "../controllers/MaturationController";

const routes = Router();

routes.get("/maturation", isAuth, MaturationController.index);
routes.post("/maturation", isAuth, MaturationController.store);
routes.get("/maturation/:id", isAuth, MaturationController.show);
routes.delete("/maturation/:id", isAuth, MaturationController.remove);
routes.get("/maturation/:id/logs", isAuth, MaturationController.logs);

export default routes;
