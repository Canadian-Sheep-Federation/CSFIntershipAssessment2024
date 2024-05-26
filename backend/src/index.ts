import express, {Express} from "express";
import dotenv from "dotenv";
import { log } from "console";
import { router } from "./router";
import mongoose from "mongoose";
import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 8008;

dotenv.config();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    log(`Server is running at : http://localhost:${port}`);
    mongoose.connect('mongodb://localhost:27017');
    const db = mongoose.connection;
    db.once('open', () => {
        log("Mongo connected!")
        app.use(router);
    });
});
