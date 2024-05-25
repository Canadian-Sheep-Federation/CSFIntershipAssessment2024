import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

// POST: Takes in the form and stores it in your chosen data store, return the id of the newly created form response
app.post('/', (req, res) => {
  res.status(201);
});

// GET: Returns all responses to the form
app.get('/', (req, res) => {
  res.status(200);
});

// GET: Returns the form corresponding to the id
app.get('/:id', (req, res) => {
  res.status(200);
});

// start server on PORT
app.listen(PORT, (error) => {
  if (!error)
    console.log(`Server has successfully started on port ${PORT}`);
  else
    console.log(`Server init error: ${error}`)
});