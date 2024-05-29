import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';

const GetReview = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/${movieId}`);
        setReviews(response.data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Error fetching reviews');
        setLoading(false);
      }
    };

    fetchReview();
  }, [movieId]);

  if (loading) {
    return <Container className="mt-4">Loading...</Container>;
  }

  if (error) {
    return <Container className="mt-4">Error: {error}</Container>;
  }
  console.log(reviews)
  return (
    <Container className="mt-4">
      <h1 className="text-center">Reviews for Movie {movieId}</h1>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Card key={review.id} className="mb-3">
            <Card.Body>
              <Card.Title>{review.name}</Card.Title>
              <Card.Text>{review.review}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No reviews found for this movie ID</p>
      )}
      <Button variant="secondary" href="/" className="me-2">
        Back
      </Button>
    </Container>
  );
};

export default GetReview;
