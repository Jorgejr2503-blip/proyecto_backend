"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: function () {
            return this.isNew;
        },
    },
    email: {
        type: String,
        unique: true,
        required: function () {
            return this.isNew;
        },
    },
    phone: {
        type: String,
        required: function () {
            return this.isNew;
        },
    },
    password: {
        type: String,
        required: function () {
            return this.isNew;
        },
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin_pais', 'editor'],
        required: true,
        default: 'editor',
    },
    country: {
        type: String,
        required: false,
        default: null,
    },
    CreatedAt: {
        type: Date,
        required: function () {
            return this.isNew;
        },
        default: new Date(),
    },
    UpdatedAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
});
exports.UserSchema.method('toJSON', function () {
    const _a = this.toObject(), { __v, _id, password } = _a, data = __rest(_a, ["__v", "_id", "password"]);
    data.uid = _id;
    return data;
});
exports.UserSchema.pre('save', function (next) {
    if (!this.isNew) {
        this.UpdatedAt = new Date();
    }
    next();
});
exports.UserModel = (0, mongoose_1.model)('User', exports.UserSchema);
