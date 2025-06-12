import express from 'express';
import cors from 'cors';
import reviewsRouter from './routes/reviews.js';

const app = express(); // Create Express app
const PORT = process.env.PORT || 4000; // Set port

app.use(cors()); // Enable cors to connect frontend and backend
app.use(express.json()); // Parse JSON bodies
app.use('/api/reviews', reviewsRouter); // Use reviews router

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
