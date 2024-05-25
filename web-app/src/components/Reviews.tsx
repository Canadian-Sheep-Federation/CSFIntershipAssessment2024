import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, Rating, IconButton, TextField, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

interface Review {
    id: number;
    showTitle: string;
    rating: number;
    review: string;
}

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState<string>('');
    const [editedReview, setEditedReview] = useState<string>('');
    const [editedRating, setEditedRating] = useState<number>(0);

    /** Retrieve all reviews on startup */
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get<Review[]>('http://localhost:8000/review');
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, []);

    // Set States to edit a review
    const editReview = (id: number, currentTitle: string, currentReview: string, currentRating: number) => {
        setEditingReviewId(id);
        setEditedTitle(currentTitle);
        setEditedReview(currentReview);
        setEditedRating(currentRating);
    };

    // Set states to cancel edit
    const cancelEdit = () => {
        setEditingReviewId(null);
        setEditedReview('');
        setEditedRating(0);
    };

    // Save an edit to the database
    const saveEdit = async (id: number) => {
        try {
            // Send edited review data to server
            await axios.put(`http://localhost:8000/review/${id}`, {
                showTitle: editedTitle,
                review: editedReview,
                rating: editedRating
            });
            setReviews(reviews.map(review =>
                review.id === id ? { ...review, review: editedReview, rating: editedRating } : review
            ));
            // Reset Edit
            cancelEdit();
        } catch (error) {
            console.error('Error saving edited review:', error);
        }
    };

    // Delete a review from the database
    const deleteReview = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/review/${id}`);
            setReviews(reviews.filter(review => review.id !== id));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div style={{ backgroundColor: "#f0f0f0", minHeight: '100vh', padding: '20px' }}>
            <Typography variant="h2" gutterBottom>
                Reviews List
            </Typography>
            {reviews.length === 0 ? (
                <Typography variant="body1">No reviews available</Typography>
            ) : (
                <div>
                    {reviews.map(review => (
                        <Box key={review.id} bgcolor="white" border={1} borderColor="black" borderRadius={4} padding={2} maxWidth="30%" textAlign="center" margin="0 auto">
                            <Typography variant="h4" gutterBottom style={{ wordWrap: 'break-word'}}>
                                {review.showTitle}
                            </Typography>
                            {editingReviewId === review.id ? (
                                <div>
                                    <Rating 
                                    value={editedRating} 
                                    precision={0.5} 
                                    onChange={(event, newValue) => setEditedRating(newValue || 0)} 
                                    size="large"
                                    sx={{fontSize: "5rem"}}
                                    />
                                    <TextField
                                        multiline
                                        fullWidth
                                        value={editedReview}
                                        onChange={event => setEditedReview(event.target.value)}
                                        variant="outlined"
                                        margin="normal"
                                        rows={4}
                                        label="Edit Review"
                                    />
                                    <Button onClick={() => saveEdit(review.id)} variant="contained" color="primary" style={{ marginRight: '8px' }}>Save</Button>
                                    <Button onClick={cancelEdit} variant="contained" style={{ marginLeft: '8px' }}>Cancel</Button>
                                </div>
                            ) : (
                                <div>
                                    <Rating value={review.rating} size="large" precision={0.5} readOnly sx={{ marginBottom: '1rem', fontSize: "5rem"}}/>
                                    <Typography variant="body1" style={{ wordWrap: 'break-word', width: "50%", textAlign: "center", margin: "0 auto" }}>
                                        {review.review}
                                    </Typography>
                                    <IconButton onClick={() => editReview(review.id, review.showTitle, review.review, review.rating)} color="primary">
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteReview(review.id)} color="error">
                                        <Delete />
                                    </IconButton>
                                </div>
                            )}
                        </Box>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reviews;
