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
exports.getAll = exports.getUserDetails = exports.addUser = void 0;
const console_1 = require("console");
const login_1 = require("../model/login");
let count = 1;
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const data = req.body;
            data['id'] = count;
            yield login_1.auditModel.create(data);
            count++;
            res.status(200).send("Logged in");
        }
        catch (error) {
            (0, console_1.log)(error);
            res.status(404).send("Login Failed!");
        }
    });
}
exports.addUser = addUser;
function getUserDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const data = login_1.auditModel.find({ id: id });
            res.send(data);
        }
        catch (error) {
            (0, console_1.log)(error);
            res.send("Error getting data");
        }
    });
}
exports.getUserDetails = getUserDetails;
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = login_1.auditModel.find();
            res.send(data);
        }
        catch (error) {
            (0, console_1.log)(error);
            res.send("Error getting all data");
        }
    });
}
exports.getAll = getAll;
