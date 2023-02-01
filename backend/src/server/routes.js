import express from "express";
import DadosController from "./controllers/DadosController.js";
// import upload from './midware/checkAuth.js';

const routes = express.Router();

routes.get('/users', DadosController.read);
routes.get('/users/:email', DadosController.searchData);
routes.post('/users/image', DadosController.createImage);
routes.post('/auth/login', DadosController.login);
routes.post('/auth/register', DadosController.create);

export default routes;