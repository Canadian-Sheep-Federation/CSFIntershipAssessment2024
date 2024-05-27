const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('responses.db'); // Using file-based database

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS responses (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, FavoriteTeam TEXT, FavoritePlayer TEXT)");
  // db.run("CREATE TABLE IF NOT EXISTS nba_players ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, teamName TEXT,birthDate TEXT,college TEXT,height REAL,weight REAL,careerYears INTEGER)")
});

const addResponse = (response, callback) => {
  const { name, favoriteTeam, favoritePlayer } = response; 
  db.run("INSERT INTO responses (Name, FavoriteTeam, FavoritePlayer) VALUES (?, ?, ?)", [name, favoriteTeam, favoritePlayer], function (err) {
      if (err) {
          console.error('Error adding response to database:', err);
          callback(err, null);
          return;
      }
      console.log('Response added successfully with ID:', this.lastID);
      callback(null, this.lastID);
  });
};

const getResponseById = (id, callback) => {
  db.get("SELECT * FROM responses WHERE id = ?", [id], (err, row) => {
    callback(err, row);
  });
};


const getAllResponses = (callback) => {
  db.all("SELECT * FROM responses", (err, rows) => {
      callback(err, rows);
  });
};

// Function to get all NBA players from the database
// function getAllNBAPlayers(callback) {
//   db.all("SELECT * FROM nba_players", (err, rows) => {
//       if (err) {
//           return callback(err);
//       }
//       callback(null, rows);
//   });
// }

// Function to add an NBA player to the database
// function addNBAPlayer(player, callback) {
//   const {
//     firstName,
//     lastName,
//     teamName,
//     birthDate,
//     college,
//     height,
//     weight,
//     careerYears
//   } = player;
//   db.run("INSERT INTO nba_players (firstName, lastName, teamName, birthDate, college, height, weight, careerYears) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//     [firstName, lastName, teamName, birthDate, college, height, weight, careerYears],
//     function (err) {
//       if (callback && typeof callback === 'function') {
//         if (err) {
//           return callback(err);
//         }
//         callback(null, this.lastID); // Return the ID of the inserted player
//       } else {
//         if (err) {
//           console.error('Error adding NBA player:', err);
//         } else {
//           console.log('NBA player added to database successfully');
//         }
//       }
//     });
// }


module.exports = {
  // addNBAPlayer,
  addResponse,
  getResponseById,
  getAllResponses
  // getAllNBAPlayers
};