const express = require('express');
const router = express.Router();
const publicapiController = require('../controller/publicapiController');

// search meals by name
router.get('/', publicapiController.fetchmealData);

//search meal by id 
router.get('/:id', publicapiController.fetchmeanbyID);

module.exports = router;