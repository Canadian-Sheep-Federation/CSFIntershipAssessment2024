import express from "express";
import connectDatabase from "./utils/connectDatabase.js";
import { PORT } from "./utils/envConfig.js";
import cors from "cors";
import formRouter from "./routes/forms.js";

const startServer = async () => {
  try {
    // connect to db
    await connectDatabase();
    // create server instance
    const app = express();
    // parse incoming req into json objects automatically
    app.use(express.json());
    // only accept connections from our frontend and since we dont have auth set creds to false
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: false,
      })
    );
    // add routes to server
    app.use(formRouter);
    // start server on port
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1); // Exit process with failure
  }
};

startServer();
