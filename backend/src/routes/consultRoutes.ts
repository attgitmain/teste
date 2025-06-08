import { Router } from "express";
import isAuth from "../middleware/isAuth";
import * as ConsultController from "../controllers/ConsultController";

const consultRoutes = Router();

consultRoutes.get("/consult/cep/:cep", isAuth, ConsultController.consultCep);

export default consultRoutes;
