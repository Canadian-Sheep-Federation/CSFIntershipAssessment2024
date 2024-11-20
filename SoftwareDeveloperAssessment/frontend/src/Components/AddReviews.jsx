import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

const AddReview = () => {
  const { movieId } = useParams();
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post('http://localhost:3100/addReview', {
        videoId: movieId,
        name,
        review,
      });
      console.log(response)
      setSuccessMessage(response.data);
      // setErrorMessage('');
    } catch (error) {
      console.error('Error adding review:', error);
      setErrorMessage('Error adding review. Please try again.');
      setSuccessMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center">Add Review{movieId}</h1>
      <Card>
        <Card.Body>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleAddReview}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formReview">
              <Form.Label>Review:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Button variant="secondary" href="/" className="me-2">
        Back
      </Button>
    </Container>
  );
};

export default AddReview;
