const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500
const {  logger } = require('./middleware/logger')
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const connectDB = require('./config/dbConn')
require('dotenv').config();
const cors = require("cors");

app.use(cors());

//function to connect the server to the db
connectDB()

//a basic console logger for the server
app.use(logger)
app.use(express.json())
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/', require('./routes/root'))
app.use('/sheeps', require('./routes/sheepRoutes'))

//404 error page
app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if(req.accepts('json')){
        res.json({message: '404 Not Found'})
    }else{
        res.type('txt').send('404 Not Found')
    }
})

//checking the connection for errors
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`)
    })    
})


mongoose.connection.on('error', err => {
    console.log(err)
})

