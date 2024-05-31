import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//Schema for the credentials data to be stored in mongodb
const credentials = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    username: String
});

const Credentials = model('credentials', credentials);
export default Credentials;
