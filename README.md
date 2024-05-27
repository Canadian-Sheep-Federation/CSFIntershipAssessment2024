# CSF Intership Assessment 2024

If you are interested in an internship opportunity with the Canadian Sheep Federation for Summer 2023, please complete the tasks outlined in the .md file relevant to what you are interested in doing this summer.

E.g. those interested in QA should complete the QA assignment.

# How To Run

- API keys and Ports may be needed to be changed accordingly.
- You will not have access to the database without contacting me to add your IP address to a whitelist of trusted connections.

# Bonus Points

## Discuss how the application and api could be extended and improved

- rate limiting of public api and requests to backend
- caching on frontend for movies and backend for forms
- Filtering and sorting movie info such as relase year, rating, genre etc
- Autocomplete movie titles as user types in title for better UX
- Authenication and authorization to secure access to backend
  - JWT tokens or cookies
- Validate and Santize user inputs on backend
  - prevent empty forms to be submitted
  - email regex
  - add services module solely for database actions
  - controllers will not direct access database but rather handle logic like santizing inputs
- Add pagination to handle large datasets instead of retrieving everything with one get call
- HTTP logging like morgan to monitor requests and errors
- HTTP headers for better security using helmet to avoid things like server fingerprinting
- Centralized error handling
  - middleware
- Testing
  - UI Testing
  - Unit Testing
  - Integration Testing
- Code quality: eslint can ensure consistent and clean code

## Discuss how the application and api should be deployed

- Containerize app using Docker and combine it with kubernetes for deployment
  - scaling, consistent dev environments
- If we don't need docker: nginx for load balancing and process managers to have multiple server instances running concurrently
- Choose cloud provider to host server eg AWS ec2
  - database is already in cloud with mongo atlas
    - backups of database
- UI could be deployed on a CDN like vercel or netlify
- Currently not following best security practices from OWASP
  - Env files are public
  - keys are public
- Automate deployment and testing with CI/CD pipelines
  - Github actions
- Monitoring and Alerting
  - Grafana can keep track of app performance and health
  - PagerDuty can alert the team of any issues in real time

## Intuitive design and user interface

- Follow accessbility standards such as WCAG to allow everyone to have a good experience
- Loading icons for better UX
- started using tailwind for better UI
  - mobile first design
