import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/Database';

class ClienteModel extends Model {
    public id!: number;
    public nombre!: string;
    public contraseña!: string;
    public email!: string;
    public rol!: string;
    public imagenUrl!: string;
    public ultimaVez!: string;
    public ultimaFecha!: Date;
}

ClienteModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagenUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ultimaVez: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ultimaFecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'cliente',
        modelName: 'Cliente',
    }
);

export { ClienteModel };
