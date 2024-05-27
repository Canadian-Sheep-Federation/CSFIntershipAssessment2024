const express = require('express');
const Model = require('../models/model');

const router = express.Router()

module.exports = router;

// POST /: 
// Takes in the form and stores it in your chosen data store. 
// Should return the id of the newly created form response.
router.post('/post', async (req, res) => {
    const data = new Model({
        seed1: req.body.seed1,
        seed2: req.body.seed2,
        seed3: req.body.seed3,
        seed4: req.body.seed4,
        seed5: req.body.seed5,
        seed1type: req.body.seed1type,
        seed2type: req.body.seed2type,
        seed3type: req.body.seed3type,
        seed4type: req.body.seed4type,
        seed5type: req.body.seed5type,
        minbpm: req.body.minbpm,
        maxbpm: req.body.maxbpm
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// GET /{id}: 
// Returns the form corresponding to the id. 
// E.g. GET /1 would return the form corresponding to the id 1
router.get('/get/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// GET /: 
// Returns all responses to the form
router.get('/get', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})