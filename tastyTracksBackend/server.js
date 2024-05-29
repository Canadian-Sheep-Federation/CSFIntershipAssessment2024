const mongoose = require("mongoose");
const dotenv = require("dotenv");

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
  console.log(err.name, err.message);
  //close teh server and then shut it down!
  server.close();
  console.log("UNHANDLED REJECTION! 🚨🚨 SHUTTING DOWN!!");
  process.exit(1);
});
