import express from 'express';
import dbOpen from '../db/db.js';

const router = express.Router();

// POST /
// Submit reviews of anime
router.post('/', async (req, res) => {
    const { name, anime, recommended, rating, comment } = req.body;
    try {
        const db = await dbOpen;
        const result = await db.run(
            'INSERT INTO reviews (name, anime, recommended, rating, comment) VALUES (?, ?, ?, ?, ?)',
            [name, anime, recommended, rating, comment]);
        res.status(201).json({ id: result.lastID }); // Return new ID
    } 
    catch (err) {
        res.status(500).json({ error: err.message }); // Error
    }
});

// GET /:id
// Get a specific review by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const db = await dbOpen;
        const row = await db.get('SELECT * FROM reviews WHERE id = ?', [id]); // Find review by ID
        res.json(row || {}); // Return review by ID or empty if not found
    } 
    catch (err) {
        res.status(500).json({ error: err.message }); // Error
    }
});

// GET /
// Get all reviews
router.get('/', async (req, res) => {
    try {
        const db = await dbOpen;
        const rows = await db.all('SELECT * FROM reviews'); // Get all reviews
        res.json(rows); // Return all rows
    } 
    catch (err) {
        res.status(500).json({ error: err.message }); // Error
    }
});

export default router;
