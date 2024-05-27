import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// detailed view of each form
function FormResponseDetails() {
  const { id } = useParams();
  const [formResponse, setFormResponse] = useState(null);

  useEffect(() => {
    const fetchFormResponse = async () => {
      const response = await axios.get(`http://localhost:3001/${id}`);
      setFormResponse(response.data);
    };

    fetchFormResponse();
  }, [id]);

  return (
    <div>
      {formResponse ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Form Response</h1>
          <p>
            <strong>imdbID:</strong> {formResponse.imdbID}
          </p>
          <p>
            <strong>Name:</strong> {formResponse.name}
          </p>
          <p>
            <strong>Email:</strong> {formResponse.email}
          </p>
          <p>
            <strong>Feedback:</strong> {formResponse.feedback}
          </p>
          <p>
            <strong>Rating:</strong> {formResponse.rating}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FormResponseDetails;
