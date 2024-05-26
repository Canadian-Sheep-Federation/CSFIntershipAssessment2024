const express = require('express'); //needed to use express
const app = express();
const axios = require('axios'); //needed to use axios for APIs

const dotenv = require('dotenv');
dotenv.config(); //will use .env file 

const port = process.env.PORT || "7894"; //app set up to run on port number 7894
const path = require("path");

const cors = require('cors'); //allows me to bypass CORS issues
app.use(cors());
app.use(express.json());

const { MongoClient, ObjectId } = require('mongodb'); //connecting to MongoDB
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@internship.slahqxh.mongodb.net/`; //need to connect to database
const client = new MongoClient(dbUrl);

async function connection() {
  const db = client.db("Internship"); //name of database
  console.log("Connected to database");
  return db;
}

app.use(express.static(path.join(__dirname, 'public'))); //creating a seperate folder

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); //page will be the default 
});

app.post('/', async (req, res) => {
  try {
    const db = await connection();
    const form = req.body;
    const result = await db.collection('forms').insertOne(form); //adds data to database
    res.status(201).send({ id: result.insertedId }); //if sucessful, should show id
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
    return res.status(400).send('Invalid ID'); //ran into issue with random things return as id
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
  const result = await db.collection('forms').insertOne(form); //add user form data into database
  res.status(201).send({ id: result.insertedId });
})

app.get('/quotes', async (req, res) => {
  try {
    const response = await axios.get('https://strangerthings-quotes.vercel.app/api/quotes/10'); //10 at the end provide me with 10 different quotes, without it it would only provide me with one
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