import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//Schema for the credentials data to be stored in mongodb
const pokemon = new Schema({
    pokemon: String,
    name: String,
    type: String,
    description: String,
    sprite: String
});

const Pokemon = model('pokemon', pokemon);
export default Pokemon;
