const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const apiRoutes = require('./src/routes')
const path = require('path');
require('dotenv').config()
const app = express();
const port = 1994;
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected SQLite database.');
  });

  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS responses (id INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT, temperature TEXT, weather TEXT)", (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Created table.');
    });
  });
  
app.use('/api', apiRoutes(db))
app.use(bodyParser.json());



  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  