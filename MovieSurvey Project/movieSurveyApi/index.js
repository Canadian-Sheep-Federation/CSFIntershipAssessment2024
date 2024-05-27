const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const formRoutes = require('./routes/movieForm');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/movieSurvey', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB database is connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/form', formRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
