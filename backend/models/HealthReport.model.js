import mongoose from "mongoose" // Import Mongoose for MongoDB interactions

// Define the schema for the health report information
const healthReportSchema = new mongoose.Schema({
	// Farm information
	farm_name: {
		type: String,
		required: true,
	},
	farm_address: {
		type: String,
		required: true,
	},
	// Reporter information
	reporter_name: {
		type: String,
		required: true,
	},
	// Whether the reporter is anonymous or not
	anonymous: {
		type: Boolean,
		default: false,
	},
	// Sheep count information
	number_of_sheep: {
		type: Number,
		required: true,
		min: 0,
	},
	// Number of sick sheep
	number_of_sick_sheep: {
		type: Number,
		required: true,
		min: 0,
	},
	// Symptoms observed (array of strings)
	symptoms_observed: {
		type: [String],
		required: true,
	},
	// Treatments administered
	treatments_administered: String,
	// Additional notes
	notes: String,
	// Date of the report
	report_date: {
		type: Date,
		default: Date.now,
	},
})

// Create a model from the schema
const HealthReport = mongoose.model("HealthReport", healthReportSchema)

export default HealthReport // Export the model
