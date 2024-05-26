"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const console_1 = require("console");
const router_1 = require("./router");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8008;
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(port, () => {
    (0, console_1.log)(`Server is running at : http://localhost:${port}`);
    mongoose_1.default.connect('mongodb://localhost:27017');
    const db = mongoose_1.default.connection;
    db.once('open', () => {
        (0, console_1.log)("Mongo connected!");
        app.use(router_1.router);
    });
});
