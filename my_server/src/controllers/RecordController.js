const sqlite3 = require("sqlite3").verbose();

/**
 * Setup connection to Sqlite3 database
 */
const db = new sqlite3.Database("src/db/records.db", (err) => {
  if (err) {
    console.error(`RecordsController failed to connect to db: ${err.message}`);
  }
});

const RecordController = () => {
  /**
   * Performs a query grabbing all rows from the database. If given query
   * params (category, difficulty, and/or name) will use them to construct
   * a query matching those params.
   * @returns a list of objects for each row from the database
   */
  const getRecords = (req, res) => {
    const { category, difficulty, name } = req.query;
    let sql = "SELECT * FROM records";
    if (category || difficulty || name) {
      const cond = [];
      if (category) cond.push(`category='${category}'`);
      if (difficulty) cond.push(`difficulty='${difficulty}'`);
      if (name) cond.push(`name='${name}'`);
      sql += ` WHERE ${cond.join(" AND ")}`;
    }
    db.all(sql, (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
      } else {
        res.send(rows);
      }
    });
  };

  /**
   * Performs a query to find a row with a specific ID
   * @returns The object that matches the query ID
   */
  const getRecord = (req, res) => {
    const { id } = req.params;
    db.all(`SELECT * FROM records WHERE id='${id}'`, (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
      } else {
        res.send(row);
      }
    });
  };

  /**
   * Inserts an answer as a row into the database
   * @returns An object containing the ID that was created for the row
   */
  const writeRecord = (req, res) => {
    const { name, difficulty, category, question, answer = "" } = req.body;
    if (!name || !difficulty || !category || !question) {
      res
        .status(400)
        .send("Invalid post request. Missing one or more parameters.");
    } else {
      const sql =
        "INSERT INTO records(name, difficulty, category, question, answer) VALUES (?, ?, ?, ?, ?)";
      db.run(
        sql,
        [name, difficulty, category, question, answer],
        function (err) {
          if (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
          } else {
            const id = this.lastID;
            res.status(201).send({ id });
          }
        }
      );
    }
  };

  return {
    getRecords,
    getRecord,
    writeRecord,
  };
};

module.exports = RecordController;
