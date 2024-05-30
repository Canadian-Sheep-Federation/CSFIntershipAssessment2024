const express = require('express')
const router = express.Router()
const sheepController = require('../controllers/sheepControllers.js')

//Route for requesting and posting to the entire database
router.route('/')
    .get(sheepController.getAllSheep)
    .post(sheepController.createNewSheep)

//Route for requesting a single sheep id
router.route('/onesheep/:id')
    .get(sheepController.getOneSheep)

module.exports = router