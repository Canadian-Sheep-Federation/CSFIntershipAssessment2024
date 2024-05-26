// API Setup
const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());

const port = process.env.NODE_ENV || 3000; // custom port with .env file or default 3000
app.set('port', port);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./db/items");

// post request to add an item
app.post("/", async (req, res) => {
  const check = await db.checkDrinkId(req.body);

  if (check !== undefined) {
    res.status(409).json({ message: "Item Already Added", success: false });
  } else {
    const results = await db.createItem(req.body);
    console.log(`Added Item. ID: ${results}`);

    res.status(201).json({ id: results[0], success: true });
  }
})

// get request to get all items
app.get("/", async (req, res) => {
  let orderBy = req.query.orderBy;
  orderBy ??= false;

  const favs = await db.getAllItems(orderBy);
  res.status(200).json({ success: true, favourites: favs });
});

// get request to get specific item by ID
app.get("/:id", async (req, res) => {
  const fav = await db.getItem(req.params.id);
  const success = fav.length !== 0;

  res.status(success ? 200 : 404).json({ success: success, favourite: fav });
});

// delete request to delete item based on ID
app.delete("/:id", async (req, res) => {
  const success = await db.deleteItem(req.params.id);

  console.log(success ? `Deleted Item. ID: ${req.params.id}` : "Non-existent item attempted delete");
  res.status(success ? 200 : 404).json({ success: !!success });
});

app.listen(port, () => { console.log(`Server Running on port ${port}`) });