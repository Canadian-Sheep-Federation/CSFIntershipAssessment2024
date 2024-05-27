import HealthReport from "../models/HealthReport.model.js"

const HealthReportController = {
	// Method to get all health reports
	getAllHealthReports: async (req, res) => {
		try {
			// Retrieve all health reports from the database
			const healthReports = await HealthReport.find()
			// Return the retrieved health reports
			return healthReports
		} catch (error) {
			// Throw an error if there's any issue with database operations
			throw new Error(error.message)
		}
	},

	createHealthReport: async (reportData) => {
		try {
			// Create a new health report instance with the provided data
			const report = new HealthReport(reportData)
			// Save the health report to the database
			const savedReport = await report.save()
			// Return the saved health report
			return savedReport
		} catch (error) {
			// Throw an error if there's any issue with database operations
			throw new Error("Failed to create health report: " + error.message)
		}
	},

	// Method to get a health report by its ID
	getHealthReportById: async (req, res) => {
		try {
			// Destructure report Id from req.params
			const { id } = req.params

			// Find the health report by its ID in the database
			const healthReport = await HealthReport.findOne({ _id: id })

			// If the health report is not found, send a not found response
			if (!healthReport) {
				console.error("Health report not found with ID:", id)
				res.status(404).json({ message: "Health report not found :(" })
				return null // Returning null to indicate no report found
			}

			// Send the health report data if found
			return healthReport
		} catch (error) {
			// Log the error and throw it to be caught by the route handler
			console.error("Error finding health report:", error)
			throw error
		}
	},
}

export default HealthReportController
