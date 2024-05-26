import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Axios from "axios";

// I did not implement the edit functionality on the frontend to save time

export default function Review({ data }) {
  const handleDelete = () => {
    Axios.delete(`http://localhost:5100/reviews/${data._id}`).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{data.anime}</Card.Title>
        <Card.Text>Review ID: {data._id}</Card.Text>
        <Card.Text>Rating: {data.rating}</Card.Text>
        <Card.Text>pros: {data.pros}</Card.Text>
        <Card.Text>cons: {data.cons}</Card.Text>
        <Card.Text>Recomend: {data.recomend ? "YES" : "NO"}</Card.Text>
        <Button variant="primary">Edit</Button>
        <Button variant="Secondary" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}
