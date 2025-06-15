import { Router } from "express";
import multer from "multer";
import isAuth from "../middleware/isAuth";
import isSuper from "../middleware/isSuper";
import * as ChipConversationController from "../controllers/ChipConversationController";

const routes = Router();
const upload = multer();

routes.get("/conversation-lists", isAuth, ChipConversationController.index);
routes.post("/conversation-lists", isAuth, isSuper, upload.single("file"), ChipConversationController.store);

export default routes;
