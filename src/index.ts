import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { ClienteModel } from './models/Clientes';
import clientRoutes from './Routes/Clientes';
import { Database, sequelize } from './config/Database';

const databaseClient = new Database();
databaseClient.connect();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sincronizar el modelo con la base de datos
sequelize.sync().then(() => {
  console.log('Modelos sincronizados con la base de datos');
});

// Configuración de rutas Clientes
app.use('/api', clientRoutes);

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



