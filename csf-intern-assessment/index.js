const express = require('express');
const app = express();
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || "7894";
const path = require("path");

const cors = require('cors');
app.use(cors());
app.use(express.json());

const { MongoClient, ObjectId } = require('mongodb');
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@internship.slahqxh.mongodb.net/`;
const client = new MongoClient(dbUrl);

async function connection() {
  const db = client.db("Internship");
  console.log("Connected to database");
  return db;
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/', async (req, res) => {
  try {
    const db = await connection();
    const form = req.body;
    const result = await db.collection('forms').insertOne(form);
    res.status(201).send({ id: result.insertedId });
  } catch (error) {
    console.error("Error inserting form data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Retrieving all form entries
app.get('/responses', async (req, res) => {
  try {
    const db = await connection();
    const forms = await db.collection('forms').find().toArray();
    res.status(200).send(forms);
  } catch (error) {
    console.error("Error retrieving all form data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Retrieve a form entry by ID
app.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID');
  }
  try {
    const db = await connection();
    console.log("Received ID:", id)
    const form = await db.collection('forms').findOne({ _id: new ObjectId(id) });
    if (form) {
      res.status(200).send(form);
    } else {
      res.status(404).send("Form not found");
    }
  } catch (error) {
    console.error("Error retrieving form data:", error);
    res.status(500).send("Internal Server Error");
  }
});



// Ignore requests for favicon.ico
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.post('/submit', async (req, res) => {
  const db = await connection();
  const form = req.body;
  const result = await db.collection('forms').insertOne(form);
  res.status(201).send({ id: result.insertedId });
})

app.get('/quotes', async (req, res) => {
  try {
    const response = await axios.get('https://strangerthings-quotes.vercel.app/api/quotes/10');
    const quotes = response.data;
    res.status(200).send(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});