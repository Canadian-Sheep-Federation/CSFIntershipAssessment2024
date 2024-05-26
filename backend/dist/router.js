"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_1 = require("./controller/user");
exports.router = (0, express_1.Router)();
exports.router.put('/addUser', user_1.addUser);
exports.router.get('/getUser/:id', user_1.getUserDetails);
exports.router.get('/users', user_1.getAll);
