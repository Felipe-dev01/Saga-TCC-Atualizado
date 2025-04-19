import { Router } from "express";
import { UserController } from "../src/controller/userController.js";
import { LoginController } from "../src/controller/loginController.js";
import { InfoController } from "../src/controller/infoController.js";
import { tokenAuthenticate } from "../src/middlewares/authenticate.js";
import { SecController } from "../src/controller/secController.js";

export const routerProf = new Router();

