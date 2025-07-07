import { Router } from "express";
import isAuth from "../middleware/isAuth";
import isSuper from "../middleware/isSuper";
import * as ReportLogController from "../controllers/ReportLogController";

const routes = Router();

routes.get("/reportlogs", isAuth, isSuper, ReportLogController.index);

export default routes;
