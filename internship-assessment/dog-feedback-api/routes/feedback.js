const express = require("express");
const router = express.Router();
const db = require("../models/feedback");

// GET all feedback
router.get("/", (req, res) => {
  const sql = "SELECT * FROM feedback";
  //   querying all the feedback to display it
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET individual feedback from id
router.get("/:id", (req, res) => {
  // grabing the id from the url parameter
  const id = req.params.id;
  const sql = `SELECT * FROM feedback WHERE id = ?`;

  //   querying the feedback by id to display individual feedback
  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Feedback not found" });
      return;
    }
    res.json(row);
  });
});

// create a feedback
router.post("/", async (req, res) => {
  try {
    // destructuring the req.body to save the values
    const { nickname, cuteness, comment, img } = req.body;
    const sql =
      "INSERT INTO feedback(nickname, cuteness, comment, img) VALUES(?, ?, ?, ?)";

    // checking if all the fields required are sent
    if (!nickname || !comment || !cuteness || !img) {
      const errorMessage =
        "nickname, comment, image is required and cuteness should be between 1 to 5";
      return res
        .status(400)
        .json({ status: 400, success: false, error: errorMessage });
    }

    // checking if the cuteness provided is a number or not
    if (isNaN(cuteness)) {
      return res.status(400).json({
        status: 400,
        success: false,
        error: "cuteness should be a number between 1 to 5",
      });
    }

    // querying to the database to create the individual data
    db.run(sql, [nickname, Number(cuteness), comment, img], function (err) {
      if (err) {
        console.error("Error inserting into database:", err);
        res.status(500).json({ status: 500, success: false, error: err });
      } else {
        const insertedId = this.lastID; // Get the ID of the newly inserted row

        // returning the status, success and id
        res.status(200).json({ status: 200, success: true, id: insertedId });
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ status: 500, success: false, error: err });
  }
});

module.exports = router;
