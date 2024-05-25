# CSF Internship Assessment 2024
Completed by Brendan Doucette

brendand7@hotmail.com

https://www.linkedin.com/in/brendan-doucette-b529b0232/


# How to Run?
Ensure that you have all the required dependencies installed, including Node.js and React.
1. Clone this repository to your local machine
2. Run 2 terminals, in one stay in the root directory and run `node webServer.js`
3. In the other terminal, run the following commands: `cd web-app` & `npm install` & `npm start`
4. Now the app should be running, view the web app in your browser!

# Preview

# Bonus Questions
## How could the application and API be extended and improved?
The application could be easily expanded further to include a number of new features, below is a list of a few important ideas.
1. UI/UX Improvements: Currently, the UI/UX is designed to be simple due to the small amount of time allocated to development, this could be improved upon further and tested with potential users to determine ideal changes to both the look and feel of the application
2. Additional features: Currently, the web-app is limited in features, allowing for basic reviewing of TV shows. This could easily be expanded to include not only TV shows, but also movies or other entertainment such as Music. The application would also benefit from a social element, allowing for the viewing of other users ratings, as well as collecting an average of the ratings provided to any individual show/movie.
3. Deployment: Deploying the application through the use of cloud services would be beneficial to ensure that the expected userbase could easily make use of the web app through the use of a common URL for access. This will remove the need for cloning, installing, and running the code locally and would allow for the above mentioned social elements.
4. Testing: The application could benefit from unit and integration testing to ensure that all the features are up to par with quality standards. User testing for UI/UX features would also be highly beneficial.
5. Database improvements: As is, the database stores information locally for simplicity, this could however be improved by using a cloud database such as Google's Firebase, which would also provide a convenient avenue for user authentication and identification if the social elements were implemented.


## Discuss how the application should be deployed
### Web Application
The Web Application is much simpler to deploy, as it simply can run on most web hosting application, a few options are listed below.
1. GitHub Pages: The web-app could be easily configured to run on GitHub pages through configuration of GitHub actions, to build and deploy the code on commits to the main/deployment branch.
2. Cloud Providers: Services such as Microsoft Azure, Amazon Web Services, and the Google Cloud Platform provide a simple and convenient way to host a web-app with relative ease, these could be configured to deploy on commits much like GitHub pages.
3. Alternative Services: Alternative services such as netlify or vercel could be easily used to host the web-app.

### API/Server
1. Cloud Servers: Services such as Microsoft Azure, Amazon Web Services, and the Google Cloud Platform provide a simple and convenient way to host the web server as an API or cloud service function. These could be deployed as standalone apis, or can be run within a VM/container

### Deployment Process
#### CI/CD Pipeline
For the deployment process, the configuration of a CI/CD pipeline would be ideal to automate the deployment process. This process can be simple through the use of GitHub actions, or Jenkins.

This pipeline can not only automate deployment, but can run tests and checks on the code to ensure it is up to quality standards.

#### Containerization
The use of containerization from a source such as Docker or Kubernetes would be beneficial to package the application and its dependencies into a lightweight, simple, and portable container for ease of transfer and use.


