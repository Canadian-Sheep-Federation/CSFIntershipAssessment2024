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
  const [responseById, setResponseById] = useState<FormResponse | null>(null);
  const [fetchById, setFetchById] = useState(false);
  const [idToFetch, setIdToFetch] = useState('');

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

  const fetchResponseById = async () => {
    try {
      const response = await axios.get(`/api/form/${idToFetch}`);
      setResponseById(response.data);
    } catch (error) {
      console.error('Error fetching response by ID', error);
      setError('Error fetching response by ID');
    }
  };

  const clearOutput = () => {
    setStockData(null);
    setAllResponses([]);
    setError(null);
    setFetchById(false)
    setResponseById(null)
    setIdToFetch("")
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: '600px', padding: '20px', textAlign: 'center' }}>
      <h1>Stock Information Form</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px', width: '100%' }}>
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
        <div style={{ marginBottom: '10px', width: '100%' }}>
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
        <div style={{ marginBottom: '10px', width: '100%' }}>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
          <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <button type="button" onClick={fetchAllResponses} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Fetch All Responses
          </button>
          <button type="button" onClick={() => setFetchById(!fetchById)} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Fetch Response by ID
          </button>
          <button type="button" onClick={clearOutput} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Clear Output
          </button>
        </div>
      </form>
      {fetchById && (
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="fetchByIdInput">Enter ID to fetch:</label>
          <input
            type="text"
            id="fetchByIdInput"
            value={idToFetch}
            onChange={(e) => setIdToFetch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              margin: '10px 0',
              color: '#000',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button type="button" onClick={fetchResponseById} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Fetch Response
          </button>
        </div>
      )}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {stockData && (
        <div style={{ marginTop: '20px' }}>
          <h2>Stock Data for {formData.stockSymbol}</h2>
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </div>
      )}
      {responseById && (
        <div style={{ marginTop: '20px' }}>
          <h2>Response for ID {responseById.id}</h2>
          <p>Name: {responseById.name}</p>
          <p>Email: {responseById.email}</p>
          <p>Stock Symbol: {responseById.stockSymbol}</p>
        </div>
      )}
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