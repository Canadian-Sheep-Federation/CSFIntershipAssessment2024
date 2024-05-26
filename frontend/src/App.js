import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import FormList from "./components/FormList";
import MovieSearch from "./components/MovieSearch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

const App = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/forms");
        setForms(response.data);
      } catch (error) {
        toast.error("Error fetching forms. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setLoading(false);
    };

    fetchForms();
  }, []);

  const handleFormSubmit = (newForm) => {
    setForms((prevForms) => [...prevForms, newForm]);
  };

  const handleFormDelete = (id) => {
    setForms((prevForms) => prevForms.filter((form) => form._id !== id));
  };

  const handleFormEdit = (updatedForm) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form._id === updatedForm._id ? updatedForm : form
      )
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className={`container-fluid ${darkMode ? "dark-mode" : ""}`}>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="my-4">Movie Mania</h1>
        <button className="btn btn-secondary" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="form-container">
        <MovieSearch />
        <Form onFormSubmit={handleFormSubmit} />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <FormList
            forms={forms}
            onDelete={handleFormDelete}
            onEdit={handleFormEdit}
          />
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default App;
