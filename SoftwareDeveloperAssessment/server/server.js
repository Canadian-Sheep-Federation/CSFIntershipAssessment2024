import { configDotenv } from "dotenv";
import express from "express"; // express as our backend api server
import mongoose from "mongoose"; // ODM for MongoDB
import { router } from "./routes/reviews.js";
import cors from "cors";

//Setting up our server and database connections

configDotenv();
const app = express();
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to DB"));

app.use(express.json());

// adding cors policy so that our react front end can make requests to our api
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use("/reviews", router);

app.listen(5100, () => console.log("Listening on Port 5100"));
