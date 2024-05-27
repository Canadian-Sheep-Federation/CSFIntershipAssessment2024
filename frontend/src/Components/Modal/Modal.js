// src/Components/Modal/Modal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Modal.css';

const Modal = ({ selectedArticle, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (selectedArticle) {
      axios.get(`http://localhost:3001/${selectedArticle.id}/comments`)
        .then(response => {
          setComments(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the comments!", error);
        });
    }
  }, [selectedArticle]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/${selectedArticle.id}/comments`, { comment: newComment })
      .then(response => {
        setComments([...comments, { id: response.data.id, comment: newComment, createdAt: new Date().toISOString() }]);
        setNewComment('');
      })
      .catch(error => {
        console.error("There was an error submitting the comment!", error);
      });
  };

  if (!selectedArticle) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{selectedArticle.title}</h2>
        <img src={selectedArticle.imageUrl || 'default-image-url.jpg'} alt={selectedArticle.title} />
        <p>{selectedArticle.description}</p>
        <p><em>{selectedArticle.publishedAt}</em></p>
        <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer">Read more</a>
        <button onClick={onClose}>Close</button>

        <div className="comments-section">
          <h3>Comments</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.comment} <em>{new Date(comment.createdAt).toLocaleString()}</em></li>
            ))}
          </ul>

          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
