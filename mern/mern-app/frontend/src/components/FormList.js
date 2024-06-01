import React from 'react';
import axios from 'axios';
import './FormList.css';

const FormList = ({ forms, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/forms/${id}`);
      onDelete(id);
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  return (
    <ul className="form-list">
      {forms.map(form => (
        <li key={form._id} className="form-list-item">
          <div className="form-text">
            <p><strong>{form.name}</strong> ({form.email})</p>
            <p>Phone: {form.phone} - Phone Valid: {form.isValid ? 'Yes' : 'No'}</p>
          </div>
          <button className="delete-button" onClick={() => handleDelete(form._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default FormList;
