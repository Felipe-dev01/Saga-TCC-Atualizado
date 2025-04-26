import { Router } from "express";
import { UserController } from "../controller/userController.js";
import { LoginController } from "../controller/loginController.js";
import { InfoController } from "../controller/infoController.js";
import { tokenAuthenticate } from "../middlewares/authenticate.js";
import { SecController } from "../controller/secController.js";

export const routerAluno = new Router();
