import { MONGO_URL } from "./envConfig.js";
import mongoose from "mongoose";
const connectDatabase = async () => {
  if (!MONGO_URL) {
    console.error("DB URL Not Defined");
    process.exit(1); // end app
  }
  try {
    await mongoose.connect(MONGO_URL);

    console.log("MongoDB Connected :) !!");
  } catch (error) {
    console.error("MongoDB ERROR: ", error.message);
    process.exit(1);
  }
};
export default connectDatabase;
