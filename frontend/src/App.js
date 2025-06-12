import React, { useEffect, useState } from 'react';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';

function App() {
    const [reviews, setReviews] = useState([]);

    const loadReviews = async () => {
        const res = await fetch('http://localhost:4000/api/reviews');
        const data = await res.json(); // Parse JSON response
        setReviews(data); // Set reviews state
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const submitReview = async ({ name, anime, recommended, rating, comment }) => {
        await fetch('http://localhost:4000/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, anime, recommended, rating, comment }),
        }); // POST request
        await loadReviews(); // Reloads reviews
    };

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
            <h2>Anime Review Form</h2>
            <ReviewForm onSubmit={submitReview} />
            <h3>All Reviews</h3>
            <ReviewList reviews={reviews} />
        </div>
    );
}

export default App;
