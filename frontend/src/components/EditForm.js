import React, { useState } from "react";

const EditForm = ({ form, onSave, onCancel }) => {
  const [name, setName] = useState(form.name);
  const [email, setEmail] = useState(form.email);
  const [movie, setMovie] = useState(form.movie);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form._id, { name, email, movie });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex align-items-center flex-wrap"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control me-2 mb-2"
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control me-2 mb-2"
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        className="form-control me-2 mb-2"
        placeholder="Favorite Movie"
        required
      />
      <div className="d-flex">
        <button type="submit" className="btn btn-primary btn-sm me-2">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
