import { Router } from "express";
import { tokenAuthenticate } from "../middlewares/authenticate.js";
import { SecController } from "../controller/secController.js";

export const routerSec = new Router();

const secController = new SecController()

routerSec.post('/sec/curso', tokenAuthenticate, secController.cadCurso);
routerSec.post('/sec/materia/:id_curso', tokenAuthenticate, secController.cadMateria);
routerSec.put('/sec/editarUsuario/:id_user', tokenAuthenticate, secController.editarUsuario);
routerSec.delete('/sec/excluirUsuario/:id_user', tokenAuthenticate, secController.excluirUsuario);
routerSec.get('/sec/consultarUsuario/:id_user', tokenAuthenticate, secController.consultarUsuario);
