import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import Form from "react-bootstrap/Form";

// component to display the anime description cards

export default function Anime({ anime }) {
  const [show, setShow] = useState(false);

  const [username, setUsername] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [rating, setRating] = useState(0);
  const [recomend, setRecomend] = useState(false);

  const handleClose = () => setShow(false);
  const handleSubmit = () => {
    console.log({
      reviewer: username,
      anime: anime.title_english || anime.title,
      pros: pros,
      cons: cons,
      rating: rating,
      recomend: recomend,
    });
    Axios.post("http://localhost:5100/reviews", {
      reviewer: username,
      anime: anime.title_english || anime.title,
      pros: pros,
      cons: cons,
      rating: rating,
      recomend: recomend,
    }).then((res) => {
      console.log(res);
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={anime.images.jpg.image_url} />
        <Card.Body>
          <Card.Title>{anime.title_english || anime.title}</Card.Title>
          <Card.Text>
            {anime.synopsis.length > 200
              ? anime.synopsis.substring(0, 200) + "..."
              : anime.synopsis}
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Write Review
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pros</Form.Label>
              <Form.Control
                value={pros}
                onChange={(e) => setPros(e.target.value)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cons</Form.Label>
              <Form.Control
                value={cons}
                onChange={(e) => setCons(e.target.value)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ marginRight: "10px" }}>Rating:</Form.Label>
              <Form.Check
                type="radio"
                inline
                label="1"
                name="group1"
                onChange={() => setRating(1)}
              />
              <Form.Check
                type="radio"
                inline
                label="2"
                name="group1"
                onChange={() => setRating(2)}
              />
              <Form.Check
                type="radio"
                inline
                label="3"
                name="group1"
                onChange={() => setRating(3)}
              />
              <Form.Check
                type="radio"
                inline
                label="4"
                name="group1"
                onChange={() => setRating(4)}
              />
              <Form.Check
                type="radio"
                inline
                label="5"
                name="group1"
                onChange={() => setRating(5)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ marginRight: "10px" }}>
                Recomend other?
              </Form.Label>
              <Form.Check
                type="radio"
                inline
                label="Yes"
                name="group2"
                onChange={() => {
                  setRecomend(true);
                }}
              />
              <Form.Check
                type="radio"
                inline
                label="No"
                name="group2"
                onChange={() => {
                  setRecomend(false);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
