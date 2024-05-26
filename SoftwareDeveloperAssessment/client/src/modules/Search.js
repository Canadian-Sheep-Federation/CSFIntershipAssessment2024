import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import Anime from "./Anime";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Search() {
  const [type, setType] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");

  const [data, setData] = useState([]);

  const handleSubmit = () => {
    Axios.get(
      `https://api.jikan.moe/v4/anime?type=${type}&min_score=${
        minScore / 100
      }&status=${status}&rating=${rating}`
    ).then((res) => {
      console.log(res.data.data);
      setData(res.data);
    });
  };

  return (
    <>
      <Form style={{ padding: "5%" }}>
        <Form.Group className="mb-3">
          <Form.Label>Enter the type of Anime</Form.Label>
          <Form.Select
            aria-label="Enter the type of Anime"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Enter the type of Anime</option>
            <option value="tv">tv</option>
            <option value="movie">movie</option>
            <option value="ova">ova</option>
            <option value="special">special</option>
            <option value="ona">ona</option>
            <option value="music">music</option>
            <option value="tv_special">tv special</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Min Rating</Form.Label>
          <Form.Range
            value={minScore}
            onChange={(e) => setMinScore(e.target.value)}
          />
          <Form.Control type="text" readOnly disabled value={minScore} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter the status of Anime</Form.Label>
          <Form.Select
            aria-label="Enter the status of Anime"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Enter the status of Anime</option>
            <option value="airing">airing</option>
            <option value="complete">complete</option>
            <option value="upcoming">upcoming</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter Audience Rating</Form.Label>
          <Form.Select
            aria-label="Enter Audience Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option>Enter the Audience Rating of Anime</option>
            <option value="g">G - All Ages</option>
            <option value="pg">PG - Children</option>
            <option value="pg13">PG-13 - Teens 13 or older</option>
            <option value="r17">R - 17+ (violence & profanity)</option>
            <option value="r">R+ - Mild Nudity</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <Row xs={1} md={2} lg={4} className="g-4">
        {data.data &&
          data.data.map((d, i) => {
            return (
              <Col
                style={{ display: "flex", justifyContent: "center" }}
                key={i}
              >
                <Anime anime={d} />
              </Col>
            );
          })}
      </Row>
    </>
  );
}
