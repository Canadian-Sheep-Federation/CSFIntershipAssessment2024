# Endpoints Documentation

- HOST_URL= https://sheep-health-watch.onrender.com/

## GET /api/health-reports/

- **Description**: Fetches all health reports.
- **Request**:

  - Method: `GET`
  - URL: `HOST_URL/api/health-reports/`

- **Response**:
  - Status Code: `200 OK`
  - Body:
    ```json
    [
      {
        "id": "string",
        "farm_name": "string",
        "farm_address": "string",
        "reporter_name": "string",
        "anonymous": "boolean",
        "number_of_sheep": "number",
        "number_of_sick_sheep": "number",
        "symptoms_observed": ["string"],
        "treatments_administered": ["string"],
        "notes": "string"
      },
      ...
    ]
    ```

---

## GET /api/health-reports/:id

- **Description**: Fetches a health report by ID.

- **Request**:

  - Method: `GET`
  - URL: `HOST_URL/api/health-reports/:id`
  - Parameters:
    - `id` (string): The ID of the health report.

- **Response**:
  - Status Code:
    - `200 OK` if the report is found.
    - `404 Not Found` if the report with the provided ID does not exist.
  - Body:
    - If found:
      ```json
      {
      	"id": "string",
      	"farm_name": "string",
      	"farm_address": "string",
      	"reporter_name": "string",
      	"anonymous": "boolean",
      	"number_of_sheep": "number",
      	"number_of_sick_sheep": "number",
      	"symptoms_observed": ["string"],
      	"treatments_administered": ["string"],
      	"notes": "string"
      }
      ```
    - If not found:
      ```json
      {
      	"error": "Report not found"
      }
      ```

---

## POST /api/health-reports/

- **Description**: Creates a new health report.

- **Request**:

  - Method: `POST`
  - URL: `HOST_URL/api/health-reports/`
  - Body:
    ```json
    {
    	"farm_name": "string",
    	"farm_address": "string",
    	"reporter_name": "string",
    	"anonymous": "boolean",
    	"number_of_sheep": "number",
    	"number_of_sick_sheep": "number",
    	"symptoms_observed": ["string"],
    	"treatments_administered": ["string"],
    	"notes": "string"
    }
    ```

- **Response**:
  - Status Code:
    - `201 Created` if the report is successfully created.
    - `400 Bad Request` if there's an issue with the request body.
  - Body:
    - If created:
      ```json
      {
      	"id": "string",
      	"farm_name": "string",
      	"farm_address": "string",
      	"reporter_name": "string",
      	"anonymous": "boolean",
      	"number_of_sheep": "number",
      	"number_of_sick_sheep": "number",
      	"symptoms_observed": ["string"],
      	"treatments_administered": ["string"],
      	"notes": "string"
      }
      ```
    - If bad request:
      ```json
      {
      	"error": "Error message"
      }
      ```

---

This documentation provides details about the available endpoints, their request methods, URLs, request parameters (if any), request body (if applicable), and possible response statuses and bodies.
