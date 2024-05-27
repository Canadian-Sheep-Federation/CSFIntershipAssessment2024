import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// displays movie details and associated form responses
function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [formResponses, setFormResponses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    rating: null,
  });
  const fetchFormResponses = async () => {
    const response = await axios.get(`http://localhost:3001/movie/${id}`);
    setFormResponses(response.data);
  };
  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=fbb40941&i=${id}`
      );
      setMovie(response.data);
    };

    fetchMovie();
    fetchFormResponses();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001", { ...formData, imdbID: id });
    setFormData({ name: "", email: "", feedback: "" });
    fetchFormResponses(); // Reload form responses after submission
  };

  return (
    <div>
      {movie && (
        <div>
          <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
          <p>
            <strong>Year:</strong> {movie.Year}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
        </div>
      )}
      <h2 className="text-2xl font-bold mt-8 mb-4">Submit a Response</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 mr-2 mb-2"
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 mr-2 mb-2"
          placeholder="Email"
          required
        />
        <textarea
          value={formData.feedback}
          onChange={(e) =>
            setFormData({ ...formData, feedback: e.target.value })
          }
          className="border p-2 mr-2 mb-2"
          placeholder="Feedback"
          required
        />
        <input
          type="number"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          className="border p-2 mr-2 mb-2"
          placeholder="Rating (0-10)"
          required
          min="0"
          max="10"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Submit
        </button>
      </form>
      <h2 className="text-2xl font-bold mt-8 mb-4">Form Responses</h2>
      {formResponses.length > 0 ? (
        <ul>
          {formResponses.map((response) => (
            <li key={response._id}>
              <a
                href={`/response/${response._id}`}
                className="text-blue-500 hover:underline"
              >
                {response._id}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <h3>No Form Responses Yet...</h3>
      )}
    </div>
  );
}

export default MovieDetails;
