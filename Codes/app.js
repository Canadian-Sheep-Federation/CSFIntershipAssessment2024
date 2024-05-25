import express from 'express'
import bodyParser from 'body-parser'
import { Sequelize, Model, DataTypes } from 'sequelize'

const app = express();

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Define Dog model
class Dog extends Model { }
Dog.init({
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    subbreed: DataTypes.TEXT

}, { sequelize, modelName: 'dog' });

// Sync models with database
sequelize.sync();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/findallbreeds", async (req, res) => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
    })
    const results = await response.json()
    console.log(results)
    if (!results) {
        res.status(400)
    }
    res.status(200).send(results)
})

app.get("/randomimage", async (req, res) => {
    const image = await fetch("https://dog.ceo/api/breeds/image/random", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
    })
    if (!image) {
        res.status(400)
    }
    const result = await image.json()
    res.status(200).send(result)
})

app.get("/:breed/images/", async (req, res) => {
    const images = await fetch(`https://dog.ceo/api/breed/${req.params.breed}/images`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
    })
    if (!images) {
        res.status(400)
    }
    const results = await images.json()
    res.status(200).send(results)
})


app.get("/:breed/subbreeds/", async (req, res) => {
    const subbreeds = await fetch(`https://dog.ceo/api/breed/${req.params.breed}/list`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
    })
    if (!subbreeds) {
        res.status(400)
    }
    const results = await subbreeds.json()
    res.status(200).send(results)
})

//api does not work
app.get("/:breed/randomimage/", async (req, res) => {
    const image = await fetch(`https://dog.ceo/api/breed/${req.params.breed}/images/random`, {
        method: "GET",
    })
    console.log(req.params.breed)
    if (!image) {
        res.status(400)
    }
    const result = await image.blob()
    res.status(200).send(image)
})


app.get("/", async (req, res) => {
    const dogs = await Dog.findAll();
    res.status(200).send(dogs)
})

app.post("/", async (req, res) => {
    const dog = await Dog.create(req.body)
    const id = dog.id
    res.status(201).send({id})
})

app.get("/:id", async (req, res) => {
    const dog = await Dog.findByPk(parseInt(req.params.id))
    if (!dog) {
        res.status(404).send()
    }
    res.status(200).send(dog)
})



// Start server
app.listen(3000, () => {
    console.log(`Server listening on port ${3000}`);
});
