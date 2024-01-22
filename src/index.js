"use strict";
/*import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket: Socket) => {
    console.log('Cliente Conectado');

    socket.on('disconnect', () => {
        console.log('Cliente Desconectado')
    })
})*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClientesControlador_1 = require("./controller/ClientesControlador");
const ConexionBaseDatos_1 = __importDefault(require("./config/ConexionBaseDatos"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
(0, ConexionBaseDatos_1.default)();
app.get('/cliente', ClientesControlador_1.getClientes);
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});
app.listen(PORT, () => {
    console.log('Conectado a la Base de Datos', PORT);
});
