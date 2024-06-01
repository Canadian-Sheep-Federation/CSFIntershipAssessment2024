const { Sequelize } = require('sequelize');

// Instance of sequlize for sqlite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:'
});

// Function to connect to the database
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };