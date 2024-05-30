const Sheep = require('../models/sheep')
const asyncHandler = require('express-async-handler')

//get method
const getAllSheep = asyncHandler(async (req, res) => {
    const sheep = await Sheep.find().select().lean()
    if(!sheep?.length) {
        return res.status(400).json({message: 'No sheep found'})
    }
    res.json(sheep)
})

//post method
const createNewSheep = asyncHandler(async (req, res) => {
    const { name, description, motto} = req.body

    //confirm data recieved
    if(!name || !description || !motto){
        return res.status(400).json({ message: 'All fields are required'})
    }

    const sheepObject = { name, description, motto }

    //Create and store sheep
    const sheep = await Sheep.create(sheepObject)

    if(sheep){
        res.status(201).json({ message: `New sheep ${name} created`})
    }else{
        res.status(400).json({ message: 'Invalid sheep data received' })
    }
})

//get method for a specific id
const getOneSheep = asyncHandler(async (req, res) => {
    const{ _id } = req.params
    if(!id?.length) {
        return res.status(400).json({message: 'Broken Package'})
    }

    const sheep = await Sheep.find({_id: req.body}).select().lean()
    if(!sheep?.length) {
        return res.status(400).json({message: 'No sheep found'})
    }
    res.json(sheep)
})

module.exports = {
    getAllSheep,
    createNewSheep,
    getOneSheep
}