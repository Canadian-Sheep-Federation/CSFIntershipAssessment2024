import { useState } from "react";
import axios from "axios";
import Docs from "./docs";

type FormResponse = {
  id: number;
  name: string;
  email: string;
  stockSymbol: string;
};

export default function Home() {
  // Form Data Structure
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    stockSymbol: "",
  });

  // Use State Hooks
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allResponses, setAllResponses] = useState<FormResponse[]>([]);
  const [responseById, setResponseById] = useState<FormResponse | null>(null);
  const [fetchById, setFetchById] = useState(false);
  const [idToFetch, setIdToFetch] = useState("");
  const [showDocs, setShowDocs] = useState(false);

  // Handle Form Data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    clearOutput();
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

  // Fetch all form responses
  const fetchAllResponses = async () => {
    clearOutput();
    try {
      const response = await axios.get("/api/form");
      setAllResponses(response.data);
    } catch (error) {
      console.error("Error fetching all responses", error);
      setError("Error fetching all responses");
    }
  };

  // fetch response by ID
  const fetchResponseById = async () => {
    clearOutput();
    try {
      const response = await axios.get(`/api/form/${idToFetch}`);
      setResponseById(response.data);
    } catch (error) {
      console.error("Error fetching response by ID", error);
      setError("Error fetching response by ID");
    }
  };

  // Clear output
  const clearOutput = () => {
    setStockData(null);
    setAllResponses([]);
    setError(null);
    setFetchById(false);
    setResponseById(null);
    setIdToFetch("");
    setShowDocs(false);
  };

  // Show documentation
  const handleShowDocs = () => {
    clearOutput();
    setShowDocs(true);
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4">
        <a
          href="https://zakirangwala.com"
          target="_blank"
          className="text-sm text-white-600 hover:animate-pulse-scale"
          style={{ transition: 'transform 0.5s, color 0.3s' }}
        >
          Made with ❤️ by Zaki
        </a>
      </div>
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-8">Stock Information Form</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <div className="w-full">
            <label htmlFor="name" className="block text-left mb-2">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div className="w-full">
            <label htmlFor="email" className="block text-left mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div className="w-full">
            <label htmlFor="stockSymbol" className="block text-left mb-2">Stock Symbol:</label>
            <input
              type="text"
              id="stockSymbol"
              name="stockSymbol"
              value={formData.stockSymbol}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <button type="submit" className="p-2 bg-grey-200 text-white rounded" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button type="button" onClick={fetchAllResponses} className="p-2 bg-grey-500 text-white rounded">
              Fetch All Responses
            </button>
            <button type="button" onClick={() => setFetchById(!fetchById)} className="p-2 bg-grey-500 text-white rounded">
              Fetch Response by ID
            </button>
            <button type="button" onClick={clearOutput} className="p-2 bg-grey-500 text-white rounded">
              Clear Output
            </button>
            <button type="button" onClick={handleShowDocs} className="p-2 bg-grey-500 text-white rounded">
              Documentation
            </button>
          </div>
        </form>
        {fetchById && (
          <div className="mt-6">
            <label htmlFor="fetchByIdInput" className="block text-left mb-2">Enter ID to fetch:</label>
            <input
              type="text"
              id="fetchByIdInput"
              value={idToFetch}
              onChange={(e) => setIdToFetch(e.target.value)}
              className="w-full p-2 border rounded mb-4 text-black"
            />
            <button type="button" onClick={fetchResponseById} className="p-2 bg-grey-500 text-white rounded">
              Fetch Response
            </button>
          </div>
        )}
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {stockData && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Stock Data for {formData.stockSymbol}</h2>
            <pre className="bg-gray-100 text-orange-600 p-1 rounded">{JSON.stringify(stockData, null, 2)}</pre>
          </div>
        )}
        {responseById && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Response for ID {responseById.id}</h2>
            <p>Name: {responseById.name}</p>
            <p>Email: {responseById.email}</p>
            <p>Stock Symbol: {responseById.stockSymbol}</p>
          </div>
        )}
        {allResponses.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">All Form Responses</h2>
            <ul className="list-disc list-inside">
              {allResponses.map(response => (
                <li key={response.id} className="mb-2">
                  {response.name} ({response.email}): {response.stockSymbol}
                </li>
              ))}
            </ul>
          </div>
        )}
        {showDocs && <Docs />}
      </div>
    </div>
  );
}