import React, { useEffect, useState } from "react";

const Responses = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => setResponses(data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">Responses</h2>
      {responses.map((response) => (
        <div key={response._id} className="p-4 border rounded-md mb-2">
          <p>
            <strong>Name:</strong> {response.name}
          </p>
          <p>
            <strong>Email:</strong> {response.email}
          </p>
          <p>
            <strong>Feedback:</strong> {response.feedback}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Responses;
