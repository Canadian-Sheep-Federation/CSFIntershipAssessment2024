# Requirements
This tech stack uses sqlite for the data base as well as Node.js and express for the framework. Before running ensure you have Node.js installed.

# Usage
Before running the server you must first create the database running the following command.
```
node initDb.js
```

Once the database is initalized run the following command to start the server.
```
node server.js
```

The server runs locally on port 8080.

# Additional Questions:
## Discuss how the application and api could be extended and improved
The api could be extended by allowing the data in the database to be deleted. Currently once the data is inserted there is no way to remove it. 
Unfortunately that is above the scope of this assignment. Another way this could be improved is by implementing unit tests. Once again that is above the scope of the assignment and implementing them would cause this to take longer then two hours but could be useful for longer projects.

## Discuss how the application and api should be deployed
In order to deploy this API it must first be hosted. After doing some quick research Heroku integrates well with GitHub, supports automatic deployment. Unfortunatly I do not have any experience with Heroku and instead would use AWS to host it. I would then run 
```
npm ci
```
for a clean installation of dependencies. Before deploying I would also ensure there are not any security issues by using best practices, HTTPS, and having a SSL for a custom domain.