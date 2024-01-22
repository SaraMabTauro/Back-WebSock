
import { Request, Response } from 'express';
import { ClienteModel } from '../models/Clientes';

export const insertarCliente = async (req: Request, res: Response) => {
    try {
        const { nombre, contraseña, email, rol, imagenUrl, ultimaVez, ultimaFecha } = req.body;

        const nuevoCliente = await ClienteModel.create({
            nombre,
            contraseña,
            email,
            rol,
            imagenUrl,
            ultimaVez,
            ultimaFecha: new Date(ultimaFecha), // Convertir a un objeto de fecha
        });

        res.status(201).json({ mensaje: 'Cliente insertado correctamente', cliente: nuevoCliente });
    } catch (error) {
        console.error('Error al insertar el cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const getClientes = async (req: Request, res: Response) => {
    try {
        const clientes = await ClienteModel.findAll();
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
            } else if (minutos > 0) {
                lastSeen = `${minutos}min ago`;
            } else {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
      const { email, contraseña } = req.body;
  
      // Buscar al usuario
      const usuario = await ClienteModel.findOne({
        where: {
          email,
          contraseña,
        },
      });
  
      if (usuario) {
        res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).json({ error: 'Credenciales inválidas' });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};
