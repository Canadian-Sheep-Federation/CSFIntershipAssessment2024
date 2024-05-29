import type { NextApiRequest, NextApiResponse } from "next";
import { setupDb, getFormData } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Ensure the database connection is set up
    await setupDb();

    // Retrieve form data by ID
    const formData = await getFormData(Number(id));
    if (!formData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res.status(200).json(formData);
  } catch (error) {
    console.error(`Error retrieving form data`, error);
    res.status(500).json({ error: "Failed to retrieve form data" });
  }
}
