import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Form = ({ onFormSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [movie, setMovie] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = name ? "" : "Name is required.";
    tempErrors.email = email ? "" : "Email is required.";
    tempErrors.movie = movie ? "" : "Favorite movie is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:3000/forms", {
          name,
          email,
          movie,
        });
        toast.success("Form submitted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setName("");
        setEmail("");
        setMovie("");
        onFormSubmit(response.data);
      } catch (error) {
        toast.error("Error submitting form. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="mb-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Name"
          required
        />
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Email"
          required
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          className="form-control"
          placeholder="Favorite Movie"
          required
        />
        {errors.movie && <div className="text-danger">{errors.movie}</div>}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
