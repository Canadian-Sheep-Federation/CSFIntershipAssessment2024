"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditModel = void 0;
const mongoose_1 = require("mongoose");
let auditSchema = new mongoose_1.Schema({
    'id': {
        type: Number,
        required: true,
        index: true,
        unique: true
    },
    'user': {
        type: String,
        required: true
    },
    'email': {
        type: String,
        required: true
    },
    'password': {
        type: String,
        required: true
    }
});
exports.auditModel = (0, mongoose_1.model)('audit', auditSchema);
