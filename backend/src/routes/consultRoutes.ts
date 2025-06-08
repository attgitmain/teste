import { Router } from "express";
import isAuth from "../middleware/isAuth";
import * as ConsultController from "../controllers/ConsultController";

const consultRoutes = Router();

consultRoutes.get("/consult/cep/:cep", isAuth, ConsultController.consultCep);
consultRoutes.get("/consult/cpf/:cpf", isAuth, ConsultController.consultCpf);

export default consultRoutes;
