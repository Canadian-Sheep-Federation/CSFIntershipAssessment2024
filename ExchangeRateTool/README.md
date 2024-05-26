# Form Submission API

## Requirements
- Java 8 or higher
- Maven
- Oracle Database

## Setup
1. Clone the repository.
2. Update 'application.properties' with your Oracle database credentials.
3. Run "Query.txt" file, from root folder, in database to create the table.
4. Run the application using 'mvn spring-boot:run'.


## Web Application
- Access the web application at 'http://localhost:8080/index.html'.

## Improvements for application and hosted API:
1. Enhancements in Survey Data:
	a) Add more detailed fields to the survey to collect additional data.
	b) Include date and time of submission for better analysis.
2. User Authentication and Authorization:
	a) Secure APIs with authentication(JWT or SESSIONID) and role-based access control.
	b) Integrate Spring Security for secure access
3. Data Analysis and Reporting:
	a) Generate reports on survey results.
4. API Enhancements:
	a) Implement pagination and sorting for API endpoints.
	b) Add search functionality to filter survey responses based on criteria.
	
## Deployements:
1. Deploying a Spring Boot application on a JBoss server (WildFly) involves packaging your application as a WAR (Web Application Archive) file and then deploying it to the JBoss server.
2. CI/CD Pipeline:
	a) Set up continuous integration and deployment pipelines using tools like Jenkins, GitHub Actions, or GitLab CI.
3. Database Management

