const express = require('express');
const path = require('path');
const app = express();
const movieForm = require('./api/movieForm');

app.use('/api/form', movieForm);

// Serve static files from the 'web' directory
app.use(express.static(path.join(__dirname, 'web')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
