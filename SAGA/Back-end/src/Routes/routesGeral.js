import { Router } from "express";
import { UserController } from "../controller/userController.js";
import { LoginController } from "../controller/loginController.js";
import { InfoController } from "../controller/infoController.js";
import { tokenAuthenticate } from "../middlewares/authenticate.js";


export const routerGeral = new Router();

const userController = new UserController();
const loginController = new LoginController();
const infoController = new InfoController();

routerGeral.post('/cad',tokenAuthenticate, userController.create);
routerGeral.get('/listarUsuarios', tokenAuthenticate, userController.listarUsuarios);
routerGeral.post('/login', loginController.auth);
routerGeral.get('/info/:id_user', tokenAuthenticate, infoController.info);
routerGeral.get('/token', tokenAuthenticate)


