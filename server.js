/*
(c) 2022 Louis. D. Nel

WARNING:
NOTE: THIS CODE WILL NOT RUN UNTIL YOU
ENTER YOUR OWN openweathermap.org APP_ID KEY

NOTE: You need to install the npm modules by executing >npm install
before running this server

Simple express server re-serving data from openweathermap.org
To test:
http://localhost:3000
or
http://localhost:3000/weather?city=Ottawa
to just set JSON response. (Note it is helpful to add a JSON formatter extension, like JSON Formatter, to your Chrome browser for viewing just JSON data.)
*/
const express = require('express') //express framework
const http = require('http')
const PORT = process.env.PORT || 3000 //allow environment variable to possible set PORT
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('reviews.db')
const socket = require('socket.io')
const app = express()
const server = http.createServer(app)

const io = socket(server)

/*YOU NEED AN APP ID KEY TO RUN THIS CODE
  GET ONE BY SIGNING UP AT openweathermap.org
*/


//Middleware
app.use(express.static(__dirname + '/public')) //static server

//Routes
app.get(['/', '/mytunes', '/mytunes.html', '/index.html'], (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

let createTableSql = `CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userName TEXT,
  songTitle TEXT,
  artistName TEXT,
  review TEXT
)`;

db.run(createTableSql, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Table created successfully');
  }
});

app.get('/song', (request, response) => {

  const title = request.query.song
  if(!title) {
    return response.status(400).send('Please provide a song title')
  }
  const titleWithPlusSigns = title.split(' ').join('+')


  const options = {
    "method": "GET",
    "hostname": "itunes.apple.com",
    "port": null,
    "path": `/search?term=${titleWithPlusSigns}&entity=musicTrack&limit=20`,
    "headers": {
      "useQueryString": true
    }
  }
  //create the actual http request and set up
  //its handlers
  http.request(options, function(apiResponse) {
    let songData = ''
    apiResponse.on('data', function(chunk) {
      songData += chunk
    })
    apiResponse.on('end', function() {
      response.contentType('application/json').json(JSON.parse(songData))
    })
  }).end()//important to end the request
           //to actually send the message
})
// when a review is submitted add the data to the sqlite3 database and send the added review to all clients
app.post('/review', (request, response) => {
  console.log('review submitted')
  let reviewData = ''
  request.on('data', chunk => {
    reviewData += chunk
  })
  request.on('end', () => {
    let review = JSON.parse(reviewData)
    let sql = `INSERT INTO reviews (userName, songTitle, artistName, review) VALUES (?, ?, ?, ?)`
    db.run(sql, [review.userName, review.songTitle, review.artistName, review.review], err => {
      if(err) {
        console.log(err)
        response.status(500).send('Error adding review')
      } else {
        io.emit('review', review)
        response.status(200).send('Review added')
      }
    })
  })
})
// get all reviews from the sqlite3 database and send them to the client
app.get('/reviews', (request, response) => {
  console.log('getting reviews')

  let sql = `SELECT * FROM reviews`
  db.all(sql, [], (err, rows) => {
    if(err) {
      console.log(err)
      response.status(500).send('Error getting reviews')
    } else {
      //console.log(rows)
      response.status(200).json(rows)
    }
  })
})
//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000`)

  }
})
