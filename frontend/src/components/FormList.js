import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
import EditForm from "./EditForm";

const FormList = ({ forms, onDelete, onEdit }) => {
  const [editForm, setEditForm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/forms/${id}`);
      toast.success("Form deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onDelete(id);
    } catch (error) {
      toast.error("Error deleting form. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleEdit = (form) => {
    setEditForm(form);
  };

  const handleSave = async (id, updatedForm) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/forms/${id}`,
        updatedForm
      );
      toast.success("Form updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onEdit(response.data);
      setEditForm(null);
    } catch (error) {
      toast.error("Error updating form. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Get current forms
  const indexOfLastForm = currentPage * formsPerPage;
  const indexOfFirstForm = indexOfLastForm - formsPerPage;
  const currentForms = forms
    .filter(
      (form) =>
        form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.movie.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstForm, indexOfLastForm);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search forms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="list-group my-4">
        {currentForms.map((form) => (
          <li
            key={form._id}
            className={`list-group-item d-flex justify-content-between align-items-center flex-wrap ${
              document.body.classList.contains("dark-mode")
                ? "text-white"
                : "text-dark"
            }`}
          >
            {editForm && editForm._id === form._id ? (
              <EditForm
                form={form}
                onSave={handleSave}
                onCancel={() => setEditForm(null)}
              />
            ) : (
              <>
                <span>
                  {form.name} - {form.email} - {form.movie}
                </span>
                <div className="d-flex">
                  <button
                    className="btn btn-secondary btn-sm me-2"
                    onClick={() => handleEdit(form)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(form._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <Pagination
        itemsPerPage={formsPerPage}
        totalItems={forms.length}
        paginate={paginate}
      />
    </>
  );
};

export default FormList;
