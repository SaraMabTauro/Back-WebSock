"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const Clientes_1 = __importDefault(require("./Routes/Clientes"));
const Database_1 = require("./config/Database");
const databaseClient = new Database_1.Database();
databaseClient.connect();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// Sincronizar el modelo con la base de datos
Database_1.sequelize.sync().then(() => {
    console.log('Modelos sincronizados con la base de datos');
});
// Configuración de rutas Clientes
app.use('/api', Clientes_1.default);
// Configuración de WebSocket
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    // Escuchar eventos del cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
