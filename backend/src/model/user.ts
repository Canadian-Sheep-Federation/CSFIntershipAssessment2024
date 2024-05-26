import { model, Schema } from "mongoose";

let auditSchema = new Schema({
    // 'id' : {
    //     type: Number,
    //     required: true,
    //     index: true,
    //     unique: true
    // },
    'user': {
        type: String,
        required: true
    },
    'email': {
        type: String,
        required: true
    },
    'mobile': {
        type: Number,
        required: true
    }
})

export const auditModel = model('audit', auditSchema);  