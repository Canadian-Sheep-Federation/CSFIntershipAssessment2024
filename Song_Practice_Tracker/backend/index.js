import express, { request, response } from "express";
import { PORT, mondoDBURL } from "./config.js";
import mongoose from "mongoose";
import songsRoute from './routes/songsRoute.js';
import cors from 'cors';
import "dotenv/config.js";
const app = express();

//for parsing JSON
app.use(express.json());
//to allow all access
app.use(cors());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to Piano Practice Tracker')
});

app.use('/songs', songsRoute);

mongoose
    .connect(mondoDBURL)
    .then(() => {
        console.log('connected to DB');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err)
    })