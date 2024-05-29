import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { setupDb, addFormData, getAllFormData } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      const { name, email, stockSymbol } = req.body;

      // Ensure the database connection is set up
      await setupDb();

      // Insert form data into the database
      const formData = await addFormData(name, email, stockSymbol);
      const id = formData.id;

      // Fetch stock data from Marketstack API
      const stockResponse = await axios.get(
        `http://api.marketstack.com/v1/tickers/${stockSymbol}/eod`,
        {
          params: {
            // IDEALLY this would be an environment variable like
            // process.env.MARKETSTACK_API_KEY
            // but I'm using it here for demonstration purposes
            access_key: "8351666da813c2ff26869b07cd90d90d",
          },
        }
      );

      // Log and return the response
      console.log(stockResponse.data);
      res.status(200).json({ id, stockData: stockResponse.data });
    } catch (error) {
      console.error(`Error handling form submission`, error);
      res.status(500).json({ error: "Failed to handle form submission" });
    }
  } else if (req.method === "GET") {
    try {
      // Ensure the database connection is set up
      await setupDb();

      // Retrieve all form data
      const formData = await getAllFormData();
      res.status(200).json(formData);
    } catch (error) {
      console.error(`Error retrieving form data: ${error}`);
      res.status(500).json({ error: "Failed to retrieve form data" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
