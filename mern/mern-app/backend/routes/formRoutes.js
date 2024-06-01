const express = require('express');
const router = express.Router();
const { createForm, getFormById, getAllForms, deleteFormById } = require('../controllers/formController');

router.route('/').post(createForm).get(getAllForms);
router.route('/:id').get(getFormById).delete(deleteFormById);

module.exports = router;
