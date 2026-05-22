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
exports.UserController = void 0;
const user_1 = require("../../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const jwt_1 = require("../../helpers/jwt");
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // let  name = req.body.name;
            let { email, phone, password } = req.body;
            try {
                const find_email = yield user_1.UserModel.findOne({ email });
                if (find_email)
                    return res.status(400).json({ ok: false, error_message: 'este correo ya esta registrado' });
                const find_phone = yield user_1.UserModel.findOne({ phone });
                if (find_phone)
                    return res.status(400).json({ ok: false, error_message: 'este numero de telefono ya esta registrado' });
                const salt = bcryptjs_1.default.genSaltSync(10);
                password = bcryptjs_1.default.hashSync(password, salt);
                const user = {
                    name: req.body.name,
                    email,
                    phone,
                    password,
                    role: req.body.role || 'editor',
                    country: req.body.country || null,
                };
                const user_model = yield user_1.UserModel.create(Object.assign({ id: crypto_1.default.randomUUID() }, user));
                const token = yield (0, jwt_1.generateToken)(user_model.id); // generacion de jwt   
                return res.status(200).json({
                    message: 'User created successfully',
                    user: user_model,
                    token
                });
            }
            catch (error) {
                console.error('error al crear el usuario', error);
                return res.status(400).json({ ok: false, error_message: 'error al crear el usuario' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const find_user = yield user_1.UserModel.findOne({ email });
                if (!find_user)
                    return res.status(400).json({ ok: false, error_message: 'email no encontrado' });
                const validPassword = bcryptjs_1.default.compareSync(password, find_user.password);
                if (!validPassword)
                    return res.status(400).json({ ok: false, error_message: 'la contraseña no es valida' });
                const token = yield (0, jwt_1.generateToken)(find_user.id);
                return res.status(200).json({ ok: true, message: 'usuario logeado', user: find_user, token });
            }
            catch (error) {
                console.error('error en el login', error);
                return res.status(400).json({ ok: false, error_message: `error al intentar logearse ${error}` });
            }
        });
    }
}
exports.UserController = UserController;
