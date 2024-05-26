const express = require("express");
const oneController = require("./controller");

module.exports = (db) => {
  const router = express.Router();
  //insert data route
  router.post("/", async (req, res) => {
    const { city, temperature, weather } = req.body;
    try {
      const sonuc = await oneController.insertData(city,temperature,weather,db);
      res.json(sonuc);
    } catch (error) {
      console.log(error)
      res.status(401).message(error);
    }
  });
  //get all data route
  router.get("/", async (req, res) => {
    try {
      const getById = await oneController.getAllData(db);
      res.json(getById);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  });
  //insert data from external api route
  router.get("/current", async (req, res) => {
    const { query } = req.query;
    try {
      const weatherData = await oneController.current(query);
      res.json(weatherData);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  });
  //get data by id
  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const getById = await oneController.getDataById(id, db);
      res.json(getById);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  });
  //delete data by id route
  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const getById = await oneController.deleteDataById(id, db);
      res.json(getById);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  });

  return router;
};
