import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    stockSymbol: ''
  });
  const [stockData, setStockData] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Save the form data to the backend
      const response = await axios.post('http://localhost:3000/api/form', formData);
      alert(`Form submitted successfully with ID: ${response.data.id}`);

      // Fetch stock data from Marketstack API
      const stockResponse = await axios.get(`http://api.marketstack.com/v1/tickers/${formData.stockSymbol}/eod`, {
        params: {
          // IDEALLY this would be an environment variable like process.env.MARKETSTACK_API_KEY
          // but I'm using it here for demonstration purposes
          access_key: '8351666da813c2ff26869b07cd90d90d'
        }
      });
      console.log(stockResponse.data);
      setStockData(stockResponse.data);
    } catch (error) {
      console.error('Error submitting form or fetching stock data', error);
      alert('Error submitting form or fetching stock data');
    }
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: '600px', padding: '20px' }}>
      <h1>Stock Information Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="stockSymbol">Stock Symbol:</label>
          <input
            type="text"
            id="stockSymbol"
            name="stockSymbol"
            value={formData.stockSymbol}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
      {stockData && (
        <div style={{ marginTop: '20px' }}>
          <h2>Stock Data for {formData.stockSymbol}</h2>
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
