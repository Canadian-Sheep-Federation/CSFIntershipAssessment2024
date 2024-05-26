import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [journal, setJournal] = useState({ country: '', city: '', notes: '', rating: '' });
  const [entries, setEntries] = useState([]);
  const [entryId, setEntryId] = useState(null);
  const [theme, setTheme] = useState('light-mode');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournal({ ...journal, [name]: value });
    if (name === 'country') {
      const country = countries.find(c => c.name.common === value);
      setSelectedCountry(country);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/', journal)
      .then(response => {
        setEntryId(response.data.id);
        fetchEntries();
      })
      .catch(error => console.error('Error submitting journal:', error));
  };

  const fetchEntries = () => {
    axios.get('http://localhost:3000/')
      .then(response => setEntries(response.data))
      .catch(error => console.error('Error fetching entries:', error));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light-mode' ? 'dark-mode' : 'light-mode';
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  return (
    <div className={`container ${theme}`}>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1>Travel Journal</h1>
        <button className="btn btn-secondary" onClick={toggleTheme}>
          Toggle {theme === 'light-mode' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Country:</label>
          <select className="form-select" name="country" onChange={handleChange} value={journal.country}>
            <option value="">Select a country</option>
            {countries.map(country => (
              <option key={country.cca3} value={country.name.common}>{country.name.common}</option>
            ))}
          </select>
          {selectedCountry && (
            <img src={selectedCountry.flags.svg} alt={`${selectedCountry.name.common} flag`} style={{ width: '50px', marginLeft: '10px' }} />
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">City/Region/Province:</label>
          <input type="text" className="form-control" name="city" onChange={handleChange} value={journal.city} />
        </div>
        <div className="mb-3">
          <label className="form-label">Notes:</label>
          <textarea className="form-control" name="notes" onChange={handleChange} value={journal.notes}></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Rating:</label>
          <select className="form-select" name="rating" onChange={handleChange} value={journal.rating}>
            <option value="">Select a rating</option>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{'⭐'.repeat(num)}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {entryId && <p className="mt-3">Submitted entry ID: {entryId}</p>}
      <h2 className="my-4">All Entries</h2>
      <ul className="list-group">
        {entries.map(entry => (
          <li key={entry.id} className="list-group-item">
            <strong>{entry.country}</strong> - {entry.city}: {entry.notes} (Rating: {'⭐'.repeat(entry.rating)})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;