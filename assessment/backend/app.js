require('dotenv').config();

const express = require("express");
const sequelize = require('./lib/database');
const appRouter = require("./routes")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

app.use(appRouter);

// Use the error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
      error: {
          message: err.message || 'Internal Server Error',
          status: err.status || 500
      }
  });
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is successfully running on port " + PORT
    );
  else console.log("Server failed to start", error);
});
