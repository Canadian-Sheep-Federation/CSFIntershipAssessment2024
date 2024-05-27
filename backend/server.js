// Import necessary modules
import express from "express" // Import Express framework
import mongoose from "mongoose" // Import Mongoose for MongoDB interactions
import dotenv from "dotenv" // Import dotenv to load environment variables
import path from "path" // Import path module for file paths
import bodyParser from "body-parser" // Import body-parser for parsing request bodies
import cors from "cors" // Import cors for enabling Cross-Origin Resource Sharing

dotenv.config() // Load environment variables from .env file
const __dirname = path.resolve() // Define the current directory

const app = express() // Initialize Express app
app.use(cors()) // Enable CORS for all routes
const PORT = process.env.PORT || 3000 // Define port, default to 3000 if not specified in env
const MONGODB_URI = process.env.MONGODB_URI // Get MongoDB URI from environment variables

import healthReportsRouter from "./routes/HealthReport.routes.js" // Import router for health reports

app.use(express.static(path.join(__dirname)))

// Connect to MongoDB
mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Failed to connect to MongoDB", err))

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })) // Parse URL-encoded bodies
app.use(express.json()) // Parse JSON bodies

// API Routes
app.use("/api/health-reports", healthReportsRouter) // Mount health reports router

// Start the server
app.listen(PORT, () => {
	console.log(`MongoDB Server is running on port ${PORT}`)
})
