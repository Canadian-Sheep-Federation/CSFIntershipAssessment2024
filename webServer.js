import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import axios from 'axios';

// Initiate Server
const app = express();
const port = 8000;

// Setup CORS for Server
app.use(cors());
app.use(express.json());

// Setup SQLite
const db = new sqlite3.Database(':memory:');

// Initialize Database table
db.serialize(() => {
    db.run("CREATE TABLE reviews (id INTEGER PRIMARY KEY AUTOINCREMENT, showTitle TEXT, rating REAL, review TEXT)");
});

// Post Endpoint to save a review
app.post("/review", async (request, response) => {
    const {showTitle, rating, review} = request.body;
    if (!showTitle || !rating || !review) {
        return response.status(400).json({ error: 'Show Title, Rating, and Review are required parameters' });
    }
    try {
        const query = db.prepare("INSERT INTO reviews (showTitle, rating, review) VALUES (?, ?, ?)");
        query.run(showTitle, rating, review, function (error){
            if(error){
                return response.status(500).send("An Error Occurred when Saving the Review");
            }
            else{
                response.json({id: this.lastID})
            }
        });
    } catch (error) {
        console.error('Error saving review: ', error.message);
        response.status(500).json({ error: error.message });
    }
});

// Get endpoint for all reviews
app.get("/review", (request, response) => {
    try{
        const query = "SELECT * FROM reviews";
        db.all(query, (error, rows) => {
            if(error){
                response.status(500).send("An Error Occurred when Retrieving Reviews");
            }
            else if(!rows){
                response.status(404).send("No Reviews Saved");
            }
            else {
                response.json(rows);
            }
        });
    } catch(error){
        response.status(500).send("An Error Occurred when Retrieving Reviews");
    }
});

// Get Endpoint for review by ID
app.get("/review/:id", (request, response) => {
    const {id} = request.params;
    if (!id) {
        return response.status(400).json({ error: 'ID parameter is required' });
    }
    try{
        const query = "SELECT * FROM reviews WHERE id = ?";
        db.get(query, [id], (error, rows) =>{
            if(error){
                response.status(500).send(`An Error Occurred when Retrieving review with ID: ${id}`);
            }
            else if(!rows){
                response.status(404).send(`Review with ID: ${id} not found`);
            }
            else{
                response.json(rows);
            }
        });
    } catch(error){
        response.status(500).send(`An Error Occurred when Retrieving review with ID: ${id}`);
    }
});

// Delete Endpoint to remove a review by ID
app.delete("/review/:id", (request, response) => {
    const {id} = request.params;
    if(!id){
        return response.status(400).json({error: 'ID Parameter is Required'});
    }
    try{
        const query = "DELETE FROM reviews WHERE id = ?"
        db.run(query, [id], function(error) {
            if(error){
                return response.status(500).send(`An Error Occurred when Deleting Review with ID: ${id}`);
            }
            else if (this.changes === 0){
                return response.status(404).send(`Review with ID: ${id} Not Found`);
            }
            else{
                response.status(204).send();
            }
        });
    } catch(error){
        response.status(500).send(`An Error Occurred when Deleting review with ID: ${id}`);
    }
});

// Put endpoint to edit a review by ID
app.put("/review/:id", async (request, response) => {
    const {id} = request.params;
    const {showTitle, rating, review} = request.body;
    if (!id) {
        return response.status(400).json({ error: 'ID parameter is required' });
    }
    if (!showTitle && !rating && !review) {
        return response.status(400).json({ error: 'A Rating and Review are Required.' });
    }
    try{
        const query = "UPDATE reviews SET showTitle = COALESCE(?, showTitle), rating = COALESCE(?, rating), review = COALESCE(?, review) WHERE id = ?";
        db.run(query, [showTitle, rating, review, id], function(error) {
            if (error) {
                return response.status(500).send(`An Error Occurred when Editing review with ID: ${id}`);
            } else if (this.changes === 0) {
                return response.status(404).send(`Review with ID: ${id} not found`);
            } else {
                response.json({ message: `Review with ID: ${id} edited successfully` });
            }
        });
    } catch(error){
        return response.status(500).send(`An Error Occurred when Editing review with ID: ${id}`);
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});