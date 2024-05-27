const db = require('./db/db.js');

const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug

// app.get('/create', async (req, res) => {
//     db.CreateTable();
//     res.send();
// });

// app.get('/drop', async (req, res) => {
//     db.Drop();
//     res.send();
// });

// Regular Endpoints

app.get('/:id(\\d+)', async (req, res) => {
    const data = await db.GetQuote(parseInt(req.params.id));
    res.send(data);
});

app.get('/', async (req, res) => {
    const quotes = await db.GetAllQuotes();
    res.send(quotes);
});

app.get('/random', async (req, res) => {
    const quote = await db.GetRandomQuote();
    res.send(quote);
});

app.post('/', async (req, res) => {
    const id = await db.InsertQuote(req.body['quote'], req.body['author'], req.body['genre']);
    res.send({id: id});
});

app.listen(port, () => {
    console.log(`Sever Started on port ${port}`)
})