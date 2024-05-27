const express = require('express')
const router = express.Router()
const formsController = require('../controllers/formsController')
// routes the requests to the appropriate controller
router.route('/')
    .get(formsController.getAllForms)
    .post(formsController.createNewForm)
router.route("/:formId").get(formsController.getSpecificFormById)

module.exports = router