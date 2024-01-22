import express from 'express';
import { insertarCliente, getClientes, login } from '../controller/ClientesControlador';

const router = express.Router();

router.post('/clientes', insertarCliente);
router.get('/clientes', getClientes);
router.post('/login',login);

export default router;
