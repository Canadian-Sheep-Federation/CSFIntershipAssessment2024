const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { addResponse, getResponseById, getAllResponses } = require('./database');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/', (req, res) => {
    addResponse(req.body, (err, id) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).send({ id });
    });
});

app.get('/:id', (req, res) => {
  getResponseById(req.params.id, (err, row) => {
      if (err) return res.status(500).send(err.message);
      if (!row) return res.status(404).send('Response not found');
      res.status(200).send(row);
  });
});

app.get('/', (req, res) => {
    getAllResponses((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
