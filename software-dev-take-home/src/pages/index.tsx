import { useState } from "react";
import axios from "axios";

type FormResponse = {
  id: number;
  name: string;
  email: string;
  stockSymbol: string;
};


export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    stockSymbol: "",
  });
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allResponses, setAllResponses] = useState<FormResponse[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Save the form data to the backend
      const response = await axios.post("/api/form", formData);
      alert(`Form submitted successfully with ID: ${response.data.id}`);

      // Fetch stock data from Marketstack API
      const stockResponse = await axios.get(
        `http://api.marketstack.com/v1/tickers/${formData.stockSymbol}/eod`,
        {
          params: {
            // IDEALLY this would be an environment variable like
            // process.env.MARKETSTACK_API_KEY
            // but I'm using it here for demonstration purposes
            access_key: "8351666da813c2ff26869b07cd90d90d",
          },
        }
      );
      setStockData(stockResponse.data);
    } catch (error) {
      console.error("Error submitting form or fetching stock data", error);
      setError("Error submitting form or fetching stock data");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllResponses = async () => {
    try {
      const response = await axios.get('/api/form');
      setAllResponses(response.data);
    } catch (error) {
      console.error('Error fetching all responses', error);
      setError('Error fetching all responses');
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
            style={{
              width: '100%',
              padding: '8px',
              margin: '5px 0',
              color: '#000',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
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
            style={{
              width: '100%',
              padding: '8px',
              margin: '5px 0',
              color: '#000',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
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
            style={{
              width: '100%',
              padding: '8px',
              margin: '5px 0',
              color: '#000',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {stockData && (
        <div style={{ marginTop: '20px' }}>
          <h2>Stock Data for {formData.stockSymbol}</h2>
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </div>
      )}
      <button onClick={fetchAllResponses} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        Fetch All Responses
      </button>
      {allResponses.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>All Form Responses</h2>
          <ul>
            {allResponses.map(response => (
              <li key={response.id}>
                {response.name} ({response.email}): {response.stockSymbol}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
