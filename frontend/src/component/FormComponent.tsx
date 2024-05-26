// src/components/FormComponent.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormComponent.css'; // Import the CSS file
import DataTable from './DataTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  user: string;
  email: string;
  mobile: number | string;
}

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ user: '', email: '', mobile: '' });
  const [dataById, setDataById] = useState<any>();
  const [id, setId] = useState<number | null>(null);
  const [validatedData, setValidatedData] = useState<any>();
  const [allData, setAllData] = useState<any>([])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for PUT request
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8008/addUser', formData);
      toast.success('User added successfully');
    } catch (error) {
      console.error('Error in PUT request:', error);
      toast.error('Failed to add user. Please try again!');
    }
    try {
        const validResponse: any = await axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=6e22697edfa7436eb645bda18e41ebc4&phone=${formData.mobile}`)
        setValidatedData(validResponse.data)
        toast.success('Validated Data fetched successfully from public API');
    } catch (error) {
        console.error(`Error while fetching data from public API : ${error}`)
        toast.error("Error while fetching data from public API");
    }
  };

  // Fetch data by ID (GET by ID request)
  const fetchDataById = async () => {
    if (id !== null) {
      try {
        const response = await axios.get(`http://localhost:8008/getUser/${id}`);
        setDataById(response.data[0]);
        toast.success('Data fetched succesfully');
      } catch (error) {
        console.error('Error in GET by ID request:', error);
        toast.error("Error while fetching data");
      }
    }
  };

  const fetchAll = async () => {
    try {
        const response = await axios.get(`http://localhost:8008/getAllUsers`);
        setAllData(response.data);
        toast.success('All Data fetched succesfully');
    } catch (error) {
        console.log("Error while getting all data");
        toast.error("Error while getting all data");
    }
  }

  useEffect(() => {
    // Fetch initial data if necessary
  }, []);

  return (
    <div className="form-container">
        <ToastContainer></ToastContainer>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="user"
            name="user"
            value={formData.user}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mobile Number:</label>
          <input 
            type='number'
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-submit">Submit & Validate</button>
      </form>

      <div className="fetch-container">
        
        {validatedData  && (
            <><h2>Validated Data</h2><div>
                <p>Mobile Number: {validatedData?.phone}</p>
                <p>Location: {validatedData?.location}</p>
                <p>Valid: {validatedData?.valid ? 'Valid' : 'Invalid'}</p>
                <p>Country: {validatedData?.country?.name}</p>
                  </div></>
        )}
      <div/>

      <div className="fetch-container">
        <h2>Fetch Data</h2>
        <input
          type="number"
          placeholder="Enter Mobile Number"
          value={id || ''}
          name='id'
          id='id'
          onChange={(e) => setId(Number(e.target.value))}
          className="form-control"
        />
        <div>
            <button onClick={fetchDataById} className="btn-fetch" disabled={!id}>Fetch</button>
            <div className="fetch-container">
        
        {dataById  && (
            <><h2>Data for Mobile number : {dataById?.mobile}</h2><div>
                <p>Mobile Number: {dataById?.mobile}</p>
                <p>Name: {dataById?.user}</p>
                <p>Email: {dataById?.email}</p>
                  </div></>
        )}
      <div/>
        </div>
        
        <div>
            <button onClick={fetchAll} className="btn-fetch">Fetch All</button>
            {allData && allData.length > 0 && <DataTable data={allData} />}
        </div>
        
      </div>
      </div>
      </div>
      </div>
  );
};

export default FormComponent;
