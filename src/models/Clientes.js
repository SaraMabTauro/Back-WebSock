"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClienteSchema = new mongoose_1.default.Schema({
    nombre: String,
    email: { type: String, unique: true, required: true },
    rol: String,
    imageUrl: String,
    ultimaVista: Date,
    contraseña: { type: String, required: true },
});
const ClienteModel = mongoose_1.default.model('Cliente', ClienteSchema);
exports.default = ClienteModel;
