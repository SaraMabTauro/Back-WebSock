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
exports.sequelize = exports.Database = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'D8aw99man@M2',
    database: 'proyecto5',
    logging: true,
});
exports.sequelize = sequelize;
class Database {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verifica la conexión
                yield sequelize.authenticate();
                console.log('Conexión a la base de datos MySQL establecida');
            }
            catch (error) {
                console.error('Error al conectar a la base de datos MySQL:', error);
                throw error;
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Cierra la conexión
                yield sequelize.close();
                console.log('Conexión a la base de datos MySQL cerrada');
            }
            catch (error) {
                console.error('Error al cerrar la conexión a la base de datos MySQL:', error);
                throw error;
            }
        });
    }
    executeQuery(sql, values) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Ejecuta la consulta
                const [rows] = yield sequelize.query(sql, { replacements: values, type: sequelize_1.QueryTypes.SELECT });
                return rows;
            }
            catch (error) {
                console.error('Error al ejecutar la consulta en la base de datos MySQL:', error);
                throw error;
            }
        });
    }
}
exports.Database = Database;
