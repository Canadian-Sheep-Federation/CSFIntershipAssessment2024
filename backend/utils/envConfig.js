import dotenv from "dotenv";

dotenv.config();
export const MONGO_URL = process.env.DB_URL || null;
export const PORT = process.env.PORT || null;
