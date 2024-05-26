import React from "react";
import "../MovieDetail.css";

const MovieDetail = ({ movie, onClose }) => {
  const isDarkMode = document.body.classList.contains("dark-mode");

  return (
    <div className="modal show d-block fade">
      <div className="modal-dialog modal-lg">
        <div className={`modal-content ${isDarkMode ? "dark-mode" : ""}`}>
          <div className="modal-header">
            <h5 className="modal-title">
              {movie.Title} ({movie.Year})
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {movie.Poster && (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="img-fluid mb-3 movie-poster"
              />
            )}
            {movie.Rated && (
              <p>
                <strong>Rated:</strong> {movie.Rated}
              </p>
            )}
            {movie.Released && (
              <p>
                <strong>Released:</strong> {movie.Released}
              </p>
            )}
            {movie.Runtime && (
              <p>
                <strong>Runtime:</strong> {movie.Runtime}
              </p>
            )}
            {movie.Genre && (
              <p>
                <strong>Genre:</strong> {movie.Genre}
              </p>
            )}
            {movie.Director && (
              <p>
                <strong>Director:</strong> {movie.Director}
              </p>
            )}
            {movie.Writer && (
              <p>
                <strong>Writer:</strong> {movie.Writer}
              </p>
            )}
            {movie.Actors && (
              <p>
                <strong>Actors:</strong> {movie.Actors}
              </p>
            )}
            {movie.Plot && (
              <p>
                <strong>Plot:</strong> {movie.Plot}
              </p>
            )}
            {movie.Awards && (
              <p>
                <strong>Awards:</strong> {movie.Awards}
              </p>
            )}
            {movie.imdbRating && (
              <p>
                <strong>IMDb Rating:</strong> {movie.imdbRating}
              </p>
            )}
            {movie.imdbVotes && (
              <p>
                <strong>IMDb Votes:</strong> {movie.imdbVotes}
              </p>
            )}
            {movie.Type && (
              <p>
                <strong>Type:</strong> {movie.Type}
              </p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
