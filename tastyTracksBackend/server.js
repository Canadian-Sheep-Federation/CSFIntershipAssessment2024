const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Synchronous errors
process.on("uncaughtException", (err) => {
  console.log("UNHANDLED EXCEPTION! 🚨🚨 SHUTTING DOWN!!");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log("Server listening on port", port);
});

process.on("unhandledRejection", (err) => {
  //close teh server and then shut it down!
  console.log("UNHANDLED REJECTION! 🚨🚨 SHUTTING DOWN!!");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
