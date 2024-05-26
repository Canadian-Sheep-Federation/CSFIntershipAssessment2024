const knex = require("knex");

// connecting to cocktails database
const connectedKnex = knex({
  client: "sqlite3",
  connection: {
    filename: "cocktails.db"
  },
  useNullAsDefault: true
});

// exporting the connected knex object
module.exports = connectedKnex;