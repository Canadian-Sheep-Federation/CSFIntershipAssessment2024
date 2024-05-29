import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { setupDb, addFormData } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { name, email, stockSymbol } = req.body;

    // Ensure the database connection is set up
    await setupDb();

    // Insert form data into the database
    const formData = await addFormData(name, email, stockSymbol);
    const id = formData.id;

    // Fetch stock data from Marketstack API
    const stockResponse = await axios.get(`http://api.marketstack.com/v1/tickers/${stockSymbol}/eod`, {
      params: {
        access_key: process.env.MARKETSTACK_API_KEY
      }
    });

    // Log and return the response
    console.log(stockResponse.data);
    res.status(200).json({ id, stockData: stockResponse.data });
  } catch (error) {
    console.error(`Error handling form submission`, error);
    res.status(500).json({ error: "Failed to handle form submission" });
  }
}
