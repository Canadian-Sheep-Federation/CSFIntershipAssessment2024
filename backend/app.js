const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const publicapiRoutes = require('./routes/publicapiRoutes');
const reviewRoutes = require('./routes/reviewRoutes');


const MONGODB_URI = "mongodb+srv://urvi:postapp@cluster1.klvsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";


// start app
const app = express();

// connect mongodb
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'userId,Content-Type, Authorization');
    if( req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/search', publicapiRoutes);
app.use('/reviews', reviewRoutes);

// server setup
app.listen(5000, () => {
    console.log('Server is running');
});