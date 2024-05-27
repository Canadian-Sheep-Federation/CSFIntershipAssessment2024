import express from "express" // Import Express framework
import HealthReportController from "../controllers/HealthReport.controllers.js" // Import controller for health reports

const healthReportsRouter = express.Router() // Create a new router instance

// Route to get all health reports
healthReportsRouter.get("/", async (req, res) => {
	try {
		// Call the controller method to get all health reports
		const reports = await HealthReportController.getAllHealthReports()
		// Set response header and status, then send JSON response with reports
		res.setHeader("Content-Type", "application/json")
		res.status(200).json(reports)
	} catch (error) {
		// If an error occurs, send a JSON response with the error message and status code 500 (Internal Server Error)
		res.status(500).json({ error: error.message })
	}
})

// Route to get a health report by ID
healthReportsRouter.get("/:id", async (req, res) => {
	try {
		// Extract report ID from request parameters
		const reportId = req.params.id
		console.log(reportId)
		// Call the controller method to get the report by ID
		const report = await HealthReportController.getHealthReportById(req, res)
		// If the report is found, send a JSON response with the report
		if (report) {
			res.status(200).json(report)
		} else {
			// If the report is not found, send a 404 response with an error message
			res.status(404).json({ error: "Report not found" })
		}
	} catch (error) {
		// If an error occurs, send a JSON response with the error message and status code 500 (Internal Server Error)
		res.status(500).json({ error: error.message })
	}
})

// Route to create a new health report
healthReportsRouter.post("/", async (req, res) => {
	try {
		// Extract necessary fields from request body
		const {
			id,
			farm_name,
			farm_address,
			reporter_name,
			anonymous,
			number_of_sheep,
			number_of_sick_sheep,
			symptoms_observed,
			treatments_administered,
			notes,
		} = req.body

		// Create a new report object with extracted fields
		const newReport = {
			id,
			farm_name,
			farm_address,
			reporter_name,
			anonymous,
			number_of_sheep,
			number_of_sick_sheep,
			symptoms_observed,
			treatments_administered,
			notes,
		}

		// Call the controller method to create a new health report with the provided data
		const createdReport = await HealthReportController.createHealthReport(
			newReport
		)
		// Send a JSON response with the created report and status code 201 (Created)
		res.status(201).json(createdReport)
	} catch (error) {
		// If an error occurs, send a JSON response with the error message and status code 400 (Bad Request)
		res.status(400).json({ error: error.message })
	}
})

export default healthReportsRouter // Export the router
