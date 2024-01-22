"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.DatabaseClient = void 0;
const mysql = __importStar(require("mysql2/promise"));
class DatabaseClient {
    constructor() {
        this.connection = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'D8aw99man@M2',
            database: 'proyecto5',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection.getConnection();
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
                yield this.connection.end();
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
                const [rows] = yield this.connection.execute(sql, values);
                return rows;
            }
            catch (error) {
                console.error('Error al ejecutar la consulta en la base de datos MySQL:', error);
                throw error;
            }
        });
    }
}
exports.DatabaseClient = DatabaseClient;
