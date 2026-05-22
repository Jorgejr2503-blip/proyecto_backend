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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = exports.generateToken = void 0;
// Importa el paquete jsonwebtoken y su tipo JwtPayload para trabajar con JWT
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Importa la configuración global, donde está la clave secreta JWT
const config_1 = require("../../config");
// Función asíncrona para generar un token JWT tomando como argumento el id del usuario
function generateToken(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Crea un objeto payload que contiene únicamente el id
            const payload = { id };
            // Firma el payload para crear el token, usando la llave secreta y configurando su expiración a 48 horas
            const token = jsonwebtoken_1.default.sign(payload, config_1.CONFIG.jwt_key, { expiresIn: '48h' });
            // Retorna el token generado
            return token;
        }
        catch (error) {
            // En caso de error al generar el token, muestra el error por consola
            console.error('no se pudo gererar el jwt', error);
        }
    });
}
exports.generateToken = generateToken;
// Función que verifica y decodifica un JWT, retornando un booleano e id de usuario, o un error si la verificación falla
function checkToken(token) {
    try {
        // Decodifica (y valida) el token usando la clave secreta, asegurando el tipo del payload
        const decoded = jsonwebtoken_1.default.verify(token, config_1.CONFIG.jwt_key);
        // Si la decodificación fue exitosa y contiene un 'id', retorna true y el 'id'
        if (decoded && decoded.id) {
            return [true, decoded.id];
        }
        // Si el token es válido pero no contiene un 'id', retorna false y un error personalizado
        return [false, new Error('Token does not contain id')];
    }
    catch (error) {
        // Si ocurre un error (token inválido, expirado, etc.), retorna false y el error capturado
        return [false, error];
    }
}
exports.checkToken = checkToken;
