import request from "supertest"
import express from "express"
import mongoose from "mongoose"
import HealthReportController from "../controllers/HealthReport.controllers.js"
import HealthReport from "../models/HealthReport.model.js"

const app = express()
app.use(express.json())

// Define routes for fetching all health reports and creating a new health report
app.get("/api/health-reports/", async (req, res) => {
	try {
		const reports = await HealthReportController.getAllHealthReports()
		res.status(200).json(reports)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

app.post("/api/health-reports/", async (req, res) => {
	try {
		const {
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

		const newReport = {
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

		const createdReport = await HealthReportController.createHealthReport(
			newReport
		)
		res.status(201).json(createdReport)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

describe("HealthReportController", () => {
	beforeAll(async () => {
		// Connect to the database before running the tests
		if (mongoose.connection.readyState === 0) {
			const MONGODB_URI = process.env.MONGODB_URI
			await mongoose.connect(MONGODB_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
		}
	})

	afterAll(async () => {
		// Drop the test database and disconnect from MongoDB after running all tests
		await mongoose.connection.dropDatabase()
		await mongoose.disconnect()
	})

	afterEach(async () => {
		// Clear the HealthReport collection after each test
		await HealthReport.deleteMany({})
	})

	describe("getAllHealthReports", () => {
		it("should retrieve all health reports", async () => {
			// Create two test health reports
			await HealthReport.create({
				farm_name: "Test Farm 1",
				farm_address: "Test Location 1",
				reporter_name: "Reporter 1",
				anonymous: false,
				number_of_sheep: 100,
				number_of_sick_sheep: 5,
				symptoms_observed: ["cough", "fever"],
				treatments_administered: "antibiotics",
				notes: "No additional notes",
			})
			await HealthReport.create({
				farm_name: "Test Farm 2",
				farm_address: "Test Location 2",
				reporter_name: "Reporter 2",
				anonymous: true,
				number_of_sheep: 200,
				number_of_sick_sheep: 10,
				symptoms_observed: ["cough", "fever"],
				treatments_administered: "vaccination",
				notes: "Urgent attention needed",
			})

			// Make a request to fetch all health reports
			const response = await request(app).get("/api/health-reports/")

			// Assertions to verify the response
			expect(response.status).toBe(200)
			expect(response.body.length).toBe(2)
			expect(response.body[0].number_of_sheep).toBe(100)
			expect(response.body[1].number_of_sheep).toBe(200)
		})

		it("should return an empty array if no health reports exist", async () => {
			// Make a request to fetch all health reports when there are none
			const response = await request(app).get("/api/health-reports/")

			// Assertions to verify the response
			expect(response.status).toBe(200)
			expect(response.body.length).toBe(0)
		})
	})

	describe("createHealthReport", () => {
		it("should create a new health report", async () => {
			// Create a new health report
			const newReport = {
				farm_name: "Test Farm 3",
				farm_address: "Test Location 3",
				reporter_name: "Reporter 3",
				anonymous: false,
				number_of_sheep: 150,
				number_of_sick_sheep: 3,
				symptoms_observed: ["cough", "fever"],
				treatments_administered: "antibiotics",
				notes: "No additional notes",
			}

			// Make a request to create a new health report
			const response = await request(app)
				.post("/api/health-reports/")
				.send(newReport)

			// Assertions to verify the response
			expect(response.status).toBe(201)
			expect(response.body).toHaveProperty("_id")
			expect(response.body.number_of_sheep).toBe(newReport.number_of_sheep)
		})

		it("should return 400 if required fields are missing", async () => {
			// Omitting farm_name in the newReport
			const newReport = {
				farm_address: "Test Location 4",
				reporter_name: "Reporter 4",
				anonymous: false,
				number_of_sheep: 100,
				number_of_sick_sheep: 5,
				symptoms_observed: ["cough", "fever"],
				treatments_administered: "antibiotics",
				notes: "No additional notes",
			}

			// Make a request to create a new health report with missing required fields
			const response = await request(app)
				.post("/api/health-reports/")
				.send(newReport)

			// Assertions to verify the response
			expect(response.status).toBe(400)
			expect(response.body).toHaveProperty("error")
		})
	})
})
