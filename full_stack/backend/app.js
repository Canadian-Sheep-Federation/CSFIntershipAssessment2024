const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");
const videoRouter = require("./controllers/video");
const logger = require("./utils/logger");
const VimeoClient = require("./api_clients/vimeoApi");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
logger.info("Connecting to MongoDB database");
mongoose
    .connect(config.MONGODB_URI)
    .then(() => logger.info("Connected to MongoDB"))
    .catch((error) => {
        logger.error("Error connecting to MongoDB: ", error.message);
    });

const vimeoClient = new VimeoClient(
    config.VIMEO_CLIENT_ID,
    config.VIMEO_CLIENT_SECRET,
    config.VIMEO_PUBLIC_ACCESS_TOKEN
);

const app = express();
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
app.use(middleware.attachApiClient("vimeo", vimeoClient));
app.use("/api/videos/", videoRouter);

module.exports = app;
