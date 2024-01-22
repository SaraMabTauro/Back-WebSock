"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteModel = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../config/Database");
class ClienteModel extends sequelize_1.Model {
}
exports.ClienteModel = ClienteModel;
ClienteModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    contraseña: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    imagenUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ultimaVez: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ultimaFecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: Database_1.sequelize,
    tableName: 'cliente',
    modelName: 'Cliente',
});
