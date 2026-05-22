"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
exports.CONFIG = {
    db: process.env.DB_CONNECTION || 'mongodb://localhost:27017/miapp',
    db_test: process.env.DB_CONNECTION_TEST || 'mongodb://localhost:27017/miapp_test',
    app: {
        port: process.env.PORT || 3000
    },
    jwt_key: process.env.JWT_KEY || 'secreto-temporal-cambiar-en-produccion',
};
