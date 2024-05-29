import React, { useState } from "react";
import axios from 'axios';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("movie");
  const apikey = "31c9449aad5e9b5ffe46359c3ebd97230bf5a3dd2a5d5e9ba63ea3b0d9487eb5";
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const url = `https://api.simkl.com/search/${type}?q=${encodeURIComponent(query)}&client_id=${apikey}`;
      const response = await axios.get(url);
      setMovies(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = () => {
    fetchMovies();
  };

  const handleAddReview = (movieId) => {
    navigate(`/addReview/${movieId}`);
  };

  const handleGetReview = (movieId) => {
    navigate(`/getReview/${movieId}`);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center">Movie Search</h1>
      <Form className="mb-4">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4} className="mb-2">
            <Form.Control
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie, show, or anime..."
            />
          </Col>
          <Col xs={12} md={3} lg={2} className="mb-2">
            <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="movie">Movie</option>
              <option value="show">Show</option>
              <option value="anime">Anime</option>
            </Form.Control>
          </Col>
          <Col xs={12} md={3} lg={2} className="mb-2">
            <Button variant="primary" onClick={handleSearch} block>Search</Button>
          </Col>
        </Row>
      </Form>
      {error && <p className="text-danger text-center">{error}</p>}
      <Row className="g-4">
        {movies.map((movie, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100">
              <Card.Img variant="top" src={`https://simkl.in/posters/${movie.poster}_m.webp`} alt={`${movie.title} poster`} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.year}</Card.Text>
                <div className="mt-auto">
                  <Button variant="secondary" className="me-2" onClick={() => handleAddReview(movie.ids.simkl_id)}>Add reviews</Button>
                  <Button variant="secondary" onClick={() => handleGetReview(movie.ids.simkl_id)}>See reviews</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Movies;
