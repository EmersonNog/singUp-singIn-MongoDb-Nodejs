import express from "express";
import routes from "./routes.js";
import cors from "cors";
import dbConfig from './config/dbConfig.js';

const PORT = 3000;
const server = express();

server.use(cors())
server.use(express.json());
server.use(routes);

server.listen(PORT, () => {
    console.log(`Servidor ativo na porta ${PORT}`)
    });