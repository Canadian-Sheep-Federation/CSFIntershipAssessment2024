import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {mongoose} from 'mongoose';
import Credentials from './model/Credentials.mjs';
import Pokemon from './model/Pokemon.mjs';

mongoose.connect('mongodb://localhost:27017/pokebuilder')

const app = express();

//CORS to enable cross platform connection
app.use(cors())
//to parse post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Connected to server!');
});

//handling annoying favicon get request
app.get('/favicon.ico', (req, res) => res.status(204));


//retreiving user data
app.get('/:username', (req, res) => {
    let search = Credentials.findOne({ username: req.params.username}).exec()
    search.then(function (doc) {
        console.log(doc)
        res.send(doc)
    })

})
//retreiving custom made cards
app.get('/dashboard/list', function(req, res) {
    let search = Pokemon.find({}).exec();
    search.then(function (docs) {
        res.send(docs)
    })

});
//posting user data to the database
app.post('/:username', (req, res) => {
    console.log(req.body);

    Credentials.exists({ username: req.body.username }).then(result => {
        if (result) {
            res.status(400).send('Username already exists')
        } else {

            const data = new Credentials({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                username: req.body.username
            });
            data.save();
            res.send(data.username)
        }
    });
});

//posting custom mard data to the database
app.post('/dashboard/:pokemon', (req, res) => {
    console.log(req.body);
    const pokedata = new Pokemon({
        pokemon: req.body.pokemon,
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        sprite: req.body.sprite
    
    });
    pokedata.save();
    res.send(pokedata)
});

app.listen(3000, () => {
    console.log(`App listening on port 3000`)
})