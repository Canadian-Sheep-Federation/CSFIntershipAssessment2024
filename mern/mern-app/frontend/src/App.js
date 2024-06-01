import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Form from './components/Form';
import FormList from './components/FormList';

function App() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/forms')
      .then(response => {
        setForms(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the forms!", error);
      });
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/forms', formData);
      setForms([...forms, response.data]);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const handleFormDelete = (id) => {
    setForms(forms.filter(form => form._id !== id));
  };

  return (
    <div className="App">
      <h1>Validate Phone Number</h1>
      <Form onSubmit={handleFormSubmit} />
      <FormList forms={forms} onDelete={handleFormDelete} />
    </div>
  );
}

export default App;
