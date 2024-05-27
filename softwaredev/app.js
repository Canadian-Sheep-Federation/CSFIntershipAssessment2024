//const apikey = "live_qjs2728xbt4DUyzHXARTlAhTy6Gr1i1gMGkWHItMaTIubE9Z38kgUulPLKWOdM05";


//npm install @thatapicompany/thecatapi

//gets random cat with breed information
//https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=live_qjs2728xbt4DUyzHXARTlAhTy6Gr1i1gMGkWHItMaTIubE9Z38kgUulPLKWOdM05
//click button to get a random cat with information
//img url
//wikipedia url
//name

//npm install -g nodemon

const {TheCatAPI} = require("@thatapicompany/thecatapi");
const theCatAPI = new TheCatAPI("live_qjs2728xbt4DUyzHXARTlAhTy6Gr1i1gMGkWHItMaTIubE9Z38kgUulPLKWOdM05")

const express = require("express");

//const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

const uri = 'mongodb+srv://username1:asdf1234567810@cluster0.jublep1.mongodb.net/catsinfo';

async function connect(){
    try {
        await mongoose.connect(uri);
        console.log("connected to MongoDB");
    }
    catch {
        console.log("error connecting");
    }
}

//username1
//asdf1234567810
//mongodb+srv://username1:asdf1234567810@cluster0.jublep1.mongodb.net
const app = express();

//get random cat picture with breed information
//and send it back with res
async function getImageWithBreeds(res) {
    const json = await theCatAPI.images.searchImages({
      limit: 1,
      hasBreeds: true,
    });
    return json;
};

async function getCatsDatabase() {
    var json = await catsmodel.find({});
    return json;
}

async function deleteEntries() {
    var result = await catsmodel.deleteMany({});
    return result;
}

async function findEntry(id) {
    var json = await catsmodel.find({id: id});
    return json;
}

const schema = new mongoose.Schema({
    breed: {type: String, required: true},
    url: {type: String, required: true},
    wikipedia_url: {type: String, required: true},
    id: {type: String, unique: true, dropDups:true}
});

const catsmodel = mongoose.model("cats", schema);

function clickRandom() {
    //respond to the post request from clicking the random picture button
    app.post('/clickedrandom', (req, res) => {
        console.log("clickedrandom");
        getImageWithBreeds().then(json => {
            //got the data now send it back to the client
            //console.log(json);
            return res.status(200).json({
                ok: true,
                data: json
            });
        }).catch(err => {
            console.log(err);
        });
    });
}

function clickSave() {
    //save the cat information client desires and report back
    app.use(express.json());
    app.post('/clickedsave', (req, res) => {
        //get data from client in json
        console.log("clickedsave");
        json = req.body;
        //console.log(json);

        //add to mongodb and send response if successfully added
        catsmodel.insertMany([
            {id: json["id"], breed: json["breed"], url: json["url"], wikipedia_url: json["wikipedia_url"]}
        ]).then(function() {
            console.log("data inserted")
            res.send(true);
        }).catch(function(error) {
            res.send(false);
        });
    });
}

function getCats() {
    app.get('/getcats', (req,res) => {
        getCatsDatabase().then(json => {
            //console.log(json);
            return res.status(200).json({
                ok: true,
                data: json
            });
        }).catch(err => {
            console.log(err);
        });
    });
}

function deleteCats() {
    app.post('/deletecats', (req, res) => {
        console.log("clicked delete");
        deleteEntries().then(result => {
            console.log(result);
            res.send(true);
        }).catch(err=> {
            console.log(err);
        });
    });
}

function searchCats() {
    //save the cat information client desires and report back
    app.get('/clickedsearch/search', (req, res) => {
        //get data from client in json
        console.log("clickedsearch");
        console.log(req.query);
        const {id} = req.query
        //json = req.body;
        //console.log(json);
        console.log(id);
        findEntry(id).then(json => {
            console.log("searched datagbase");
            console.log(json);
            return res.status(200).json({
                ok:true,
                data: json
            });
        }).catch(err => {
            console.log(err);
        })
        /*
        //add to mongodb and send response if successfully added
        catsmodel.insertMany([
            {id: json["id"], breed: json["breed"], url: json["url"], wikipedia_url: json["wikipedia_url"]}
        ]).then(function() {
            console.log("data inserted")
            res.send(true);
        }).catch(function(error) {
            res.send(false);
        });
        */
    });
}

//startup server
function startup() {
    app.use(express.static('public'));

    connect();
    
    // start the express web server listening on 3000
    app.listen(3000, () => {
        console.log('listening on 3000');
    });

    //serve the homepage
    app.get("/", (req,res) => {
        res.sendFile(__dirname + "/index.html");
    });



    clickRandom();
    clickSave();
    getCats();
    deleteCats();

    searchCats();
}

startup()


