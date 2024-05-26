
  //insert data to db query
   async function insertData(city, temperature, weather, db) {
    const result = await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO responses (city, temperature, weather) VALUES (?, ?, ?)`,
        [city, temperature, weather],
        function (err) {
          if (err) {
            return reject("Data insert error");
          }
          resolve({ id: this.lastID });
        },
      );
    });
    return result;
  }
  //get all data from db query
  async function getAll(db) {
    const result = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM responses`, function (err, rows) {
        if (err) {
          return reject("Data read error");
        }
        resolve(rows);
      });
    });
    return result;
  }
  //get data by id from db query
  async function getById(id, db) {
    const result = await new Promise((resolve, reject) => {
      db.get(`SELECT * FROM responses WHERE id = ?`, [id], function (err, row) {
        if (err) {
          return reject("Data read error");
        }
        resolve(row);
      });
    });
    return result;
  }
  //delete data from db query
  async function deleteById(id, db) {
    const result = await new Promise((resolve, reject) => {
      db.run(`DELETE FROM responses WHERE id = ?`, [id], function (err) {
        if (err) {
          return reject("Data delete error");
        }
        resolve({ message: "Record deleted successfully" });
      });
    });
    return result;
  }


module.exports = {
  deleteById,
  getById,
  getAll,
  insertData
}
