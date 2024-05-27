HOST = "https://sheep-health-watch.onrender.com/api"
// var HOST = "http://localhost:3000/api"

// Define constant for host
console.log(HOST)

// Define arrays to store data
let reportsFetched = []
let allReports = []

// Define routes
const routes = {
	"/": renderHomePage,
	"/reportform": renderReportFormPage,
}

// Function to render home page
function renderHomePage() {
	// Get DOM elements
	const mapContainer = document.getElementById("map-container")
	const reportFormContainer = document.getElementById("report-form-container")
	const submitReportBtn = document.querySelector(".submit-report")
	const reportList = document.querySelector(".report-list")

	if (mapContainer && reportFormContainer && submitReportBtn && reportList) {
		mapContainer.classList.remove("d-none")
		reportFormContainer.classList.add("d-none")
		submitReportBtn.classList.remove("d-none")
		reportList.classList.remove("d-none")
	} else {
		console.error("One or more required elements not found.")
	}
}

// Function to render report form page
function renderReportFormPage() {
	document.getElementById("map-container").classList.add("d-none")
	document.getElementById("report-form-container").classList.remove("d-none")
	document.querySelector(".submit-report").classList.add("d-none")
	document.querySelector(".report-list").classList.add("d-none")
}

// Function to handle actions after submitting a report
async function handleReportSubmission() {
	// Show map container
	document.getElementById("map-container").classList.remove("d-none")

	// Hide report form container and other elements
	document.getElementById("report-form-container").classList.add("d-none")
	document.querySelector(".submit-report").classList.remove("d-none")
	document.querySelector(".report-list").classList.remove("d-none")
	navigateTo("/")
	// Render data and initialize map
	await renderData()
	await initMap()
}

// Function to navigate to a route
function navigateTo(route) {
	window.history.pushState({}, route, window.location.origin + route)
	routes[route]()
}

// Event listener for submit report button
document.getElementById("submit-report").addEventListener("click", () => {
	navigateTo("/reportform")
})

// Event listener for cancel report button
document.getElementById("cancel-report").addEventListener("click", () => {
	navigateTo("/")
})

// Event listener for submitting report form
document.getElementById("reportForm").addEventListener("submit", async (e) => {
	e.preventDefault()

	// Get form data
	const farmName = document.getElementById("farm_name").value
	const farmAddress = document.getElementById("farm_address").value
	const reporterName = document.getElementById("reporter_name").value
	const anonymous = document.getElementById("anonymous").checked
	const numberOfSheep = parseInt(
		document.getElementById("number_of_sheep").value
	)
	const numberOfSickSheep = parseInt(
		document.getElementById("number_of_sick_sheep").value
	)
	const symptoms = document.getElementById("symptoms_observed").value.split(",")
	const treatments = document.getElementById("treatments_administered").value
	const notes = document.getElementById("notes").value

	// Validation: Check if the number of sick sheep is greater than the total number of sheep
	if (numberOfSickSheep > numberOfSheep) {
		alert(
			"Number of sick sheep cannot be greater than the total number of sheep."
		)
		return // Stop form submission
	}

	// Create new report object
	const newReport = {
		farm_name: farmName,
		farm_address: farmAddress,
		reporter_name: reporterName,
		anonymous: anonymous,
		number_of_sheep: numberOfSheep,
		number_of_sick_sheep: numberOfSickSheep,
		symptoms_observed: symptoms,
		treatments_administered: treatments,
		notes: notes,
	}

	try {
		// Send POST request to create new report
		const response = await fetch(`${HOST}/health-reports/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newReport),
		})

		const responseData = await response.json()

		if (response.ok) {
			console.log("Report saved successfully")
			document.getElementById("reportForm").reset()

			// Call function to handle report submission
			await handleReportSubmission()
		} else {
			console.error(
				"Failed to save report:",
				responseData.error || "Unknown error"
			)
		}
	} catch (error) {
		console.error("Error:", error)
	}
})

// Function to initialize the application
function initializeApp() {
	const currentRoute = window.location.pathname
	if (routes[currentRoute]) {
		routes[currentRoute]()
	} else {
		renderHomePage()
	}
}

// Function to fetch health reports
async function fetchHealthReports() {
	try {
		// Send GET request to fetch all health reports
		const response = await fetch(`${HOST}/health-reports/`, {
			method: "GET",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
		})
		return response.json()
	} catch (error) {
		console.error("Failed to fetch health reports:", error)
		return []
	}
}

// Function to verify address using external Public API Nominatim
async function verifyAddress(address) {
	const encodedAddress = encodeURIComponent(address)
	const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1&limit=1`

	try {
		// Send GET request to geocode address
		const response = await fetch(url)
		const data = await response.json()

		if (response.ok && data.length > 0) {
			const { lat, lon } = data[0]
			return { lat: parseFloat(lat), lng: parseFloat(lon) }
		} else {
			throw new Error(`Unable to geocode address ${address}`)
		}
	} catch (error) {
		console.error("Error geocoding address:", error)
		return null
	}
}

// Function to initialize Google Map
async function initMap() {
	const { Map, InfoWindow } = await google.maps.importLibrary("maps")
	const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
		"marker"
	)

	const map = new Map(document.getElementById("map"), {
		zoom: 4,
		center: { lat: 53.7267, lng: -127.6476 },
		mapId: "4504f8b37365c3d0",
	})

	const infoWindow = new InfoWindow()
	const bounds = new google.maps.LatLngBounds()

	for (const report of reportsFetched) {
		const { farm_address, number_of_sheep, number_of_sick_sheep } = report

		try {
			const location = await verifyAddress(farm_address)
			if (location) {
				const { lat, lng } = location
				const position = { lat, lng }
				const title = report.farm_name

				const marker = new google.maps.Marker({
					position,
					map,
					title: `${reportsFetched.indexOf(report) + 1}. ${title}`,
				})

				bounds.extend(position)

				marker.addListener("click", () => {
					infoWindow.close()
					const percentageSick = (
						(number_of_sick_sheep / number_of_sheep) *
						100
					).toFixed(2)
					infoWindow.setContent(`
       <div style="font-family: Arial, sans-serif;">
            <h3 style="margin-bottom: 4px;  font-weight: bold; color: #476433;">${title}</h3>
            <h4 style="margin-bottom: 4px;"><strong>Location:</strong> ${farm_address}</h4>
            <h4 style="margin-bottom: 4px;"><strong>Percentage of sick sheep:</strong>: <span style="color: red; font-weight: bold;">${percentageSick}%</span></h4>
        </div>
    `)
					infoWindow.open(marker.map, marker)

					// Filter table to show only the selected report
					filterTable(report)
					// Add a listener to the info window close event
					google.maps.event.addListener(infoWindow, "closeclick", function () {
						// Reset table to show all reports when info window is closed
						displayReports(allReports)
					})
				})
			} else {
				console.error(`Failed to geocode address: ${farm_address}`)
			}
		} catch (error) {
			console.error("Error creating marker:", error)
		}
	}

	if (!bounds.isEmpty()) {
		map.fitBounds(bounds)
	}

	map.addListener("click", () => {
		// Reset table to show all reports when clicking anywhere else on the map
		displayReports(allReports)
	})
}

// Function to render data
async function renderData() {
	reportsFetched = await fetchHealthReports()
	allReports = reportsFetched.slice() // Keep a copy of all reports
	displayReports(reportsFetched)
	await initMap()
}

// Function to display reports in a table
function displayReports(reports) {
	const tableBody = document.querySelector("#reportTable tbody")
	tableBody.innerHTML = ""

	reports.forEach((report, index) => {
		const row = document.createElement("tr")
		// Parse the report_date to a Date object if it is not already
		let reportDate = new Date(report.report_date)
		let formattedDate = "Invalid Date" // Default in case of an invalid date

		if (!isNaN(reportDate)) {
			formattedDate = reportDate.toLocaleDateString()
		}
		const fields = [
			report._id,
			formattedDate,
			report.farm_name,
			report.farm_address,
			report.anonymous ? "Anonymous" : report.reporter_name,
			,
			report.number_of_sheep,
			report.number_of_sick_sheep,
			report.symptoms_observed.join(", "),
			report.treatments_administered,
			report.notes,
		]

		fields.forEach((field) => {
			const cell = document.createElement("td")
			cell.textContent = field
			row.appendChild(cell)
		})

		tableBody.appendChild(row)
	})
}

// Function to filter table by report
function filterTable(report) {
	displayReports([report])
}

// Initialize the application when DOM content is loaded
document.addEventListener("DOMContentLoaded", async () => {
	initializeApp()
	await renderData()
})
