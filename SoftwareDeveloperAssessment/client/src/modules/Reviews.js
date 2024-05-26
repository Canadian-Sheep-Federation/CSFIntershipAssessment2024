import React, { useState } from "react";
import Navbar from "./Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Axios from "axios";
import Review from "./Review";

export default function Reviews() {
  const [id, setId] = useState("");

  const [data, setData] = useState([]);

  const handleSubmit = () => {
    Axios.get(`http://localhost:5100/reviews/${id}`).then((res) => {
      console.log(res);
      setData(res);
    });
  };

  return (
    <>
      <Navbar />
      <h3>Please refresh search after deleting to see changes</h3>
      <Form style={{ padding: "5%" }}>
        <Form.Group className="mb-3">
          <Form.Label>
            Search review by ID (Leaving this empty will fetch all Reviews)
          </Form.Label>
          <Form.Control
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>

      <Row xs={1} md={2} lg={4} className="g-4">
        {data.data && (data.data.length > 1 || data.data.length == 0) ? (
          data.data.map((d, i) => {
            return (
              <Col
                style={{ display: "flex", justifyContent: "center" }}
                key={i}
              >
                <Review data={d} />
              </Col>
            );
          })
        ) : data.data ? (
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <Review data={data.data} />
          </Col>
        ) : (
          <></>
        )}
      </Row>
    </>
  );
}
