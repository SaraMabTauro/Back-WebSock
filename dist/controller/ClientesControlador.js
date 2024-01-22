"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.getClientes = exports.insertarCliente = void 0;
const Clientes_1 = require("../models/Clientes");
const insertarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, contraseña, email, rol, imagenUrl, ultimaVez, ultimaFecha } = req.body;
        const nuevoCliente = yield Clientes_1.ClienteModel.create({
            nombre,
            contraseña,
            email,
            rol,
            imagenUrl,
            ultimaVez,
            ultimaFecha: new Date(ultimaFecha), // Convertir a un objeto de fecha
        });
        res.status(201).json({ mensaje: 'Cliente insertado correctamente', cliente: nuevoCliente });
    }
    catch (error) {
        console.error('Error al insertar el cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.insertarCliente = insertarCliente;
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientes = yield Clientes_1.ClienteModel.findAll();
        const clientesFormateados = clientes.map((cliente) => {
            const ahora = new Date();
            const ultimaFecha = new Date(cliente.ultimaFecha);
            const diferenciaEnMs = ahora.getTime() - ultimaFecha.getTime();
            let lastSeen = '';
            // Lógica para determinar "hace cuánto tiempo" en base a la diferencia de tiempo
            const segundos = Math.floor(diferenciaEnMs / 1000);
            const minutos = Math.floor(segundos / 60);
            const horas = Math.floor(minutos / 60);
            if (horas > 0) {
                lastSeen = `${horas}h ago`;
            }
            else if (minutos > 0) {
                lastSeen = `${minutos}min ago`;
            }
            else {
                lastSeen = `${segundos}s ago`;
            }
            return {
                name: cliente.nombre,
                email: cliente.email,
                rol: cliente.rol,
                imageUrl: cliente.imagenUrl,
                lastSeen,
                lastSeenDateTime: cliente.ultimaFecha.toISOString(),
            };
        });
        res.status(200).json(clientesFormateados);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getClientes = getClientes;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, contraseña } = req.body;
        // Buscar al usuario
        const usuario = yield Clientes_1.ClienteModel.findOne({
            where: {
                email,
                contraseña,
            },
        });
        if (usuario) {
            res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
        }
        else {
            res.status(401).json({ error: 'Credenciales inválidas' });
        }
    }
    catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.login = login;
