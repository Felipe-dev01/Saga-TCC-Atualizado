import { Router } from "express";
import { UserController } from "../src/controller/userController.js";
import { LoginController } from "../src/controller/loginController.js";
import { InfoController } from "../src/controller/infoController.js";
import { tokenAuthenticate } from "../src/middlewares/authenticate.js";
import { SecController } from "../src/controller/secController.js";

export const routerGeral = new Router();

const userController = new UserController();
const loginController = new LoginController();
const infoController = new InfoController();

routerGeral.post('/cad',tokenAuthenticate, userController.create);
routerGeral.get('/listarUsuarios', tokenAuthenticate, userController.listarUsuarios);
routerGeral.post('/login', loginController.auth);
routerGeral.get('/info/:id_user', tokenAuthenticate, infoController.info);


