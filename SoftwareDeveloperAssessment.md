# Background

As a Canadian Sheep Federation intern, you will be tasked with creating
and developing web applications and APIs. This take home assignment is
designed to test your knowledge of the concepts involved.

You will create the following:

-   An API that writes to a data store
-   A web application that consumes the API you\'ve developed and a
    public API of your choosing

If you\'ve never created an API or a web-application, don\'t worry. Give
it your best shot and leave detailed comments and documentation for what
you don\'t know and what you think it should do.

This task should take approximately two hours

Select your public API from here:
<https://github.com/public-apis/public-apis>

# API

You must build a REST-ful API that represents some sort of form. The
form should mesh well with the public API you\'ve chosen. For instance,
if you\'ve chosen a movie API for your public API, this form could be a
survey about a specific movie or movies of a certain director.

The form must have three (3!) fields minimum.

The language and framework in which the API is implemented is up to you.
At the CSF, we use Node.js and express.

The API must store the form data in some permanent data store. At the
CSF, we use mongodb. A good option for this assessment could be sqlite.

The API must have the following endpoints:

-   POST /: Takes in the form and stores it in your chosen data store.
    Should return the id of the newly created form response.
-   GET /{id}: Returns the form corresponding to the id. E.g. GET /1
    would return the form corresponding to the id 1
-   GET /: Returns all responses to the form

Be sure to document your code thoroughly and include instructions for
how to run your api.

# Web application

You must build a web application that:

-   Allows users to query the public API you\'ve selected
-   Allows users to enter responses to the form you designed earlier and
    view the other responses to the form

# Bonus Points

## Discuss how the application and api could be extended and improved

The application and API can be extended and improved by implementing more robust error handling and validation mechanisms. For example, adding validation middleware to ensure all required fields are correctly filled out before processing the request can prevent potential errors. Additionally, implementing logging to capture and monitor errors can help in quickly identifying and resolving issues. We could also add authentication and authorization to secure the API endpoints, ensuring that only authorized users can access or modify the data. Furthermore, expanding the API to include additional endpoints for updating and deleting form responses can enhance the functionality and flexibility of the application.

## Discuss how the application and api should be deployed

The application and API should be deployed using a cloud-based service like Vercel for the frontend and serverless functions, and a managed database service like Heroku Postgres for the database. This ensures scalability, reliability, and ease of management. CI/CD pipelines can be set up to automate testing and deployment, ensuring that any changes to the codebase are tested and deployed seamlessly. Environment variables should be securely managed using the platform's secrets management tools to protect sensitive information like API keys and database credentials. Additionally, monitoring and alerting should be configured to keep track of application performance and quickly respond to any issues.

## Intuitive design and user interface

### Tailwind for a touch of perfection
The application uses Tailwind CSS for a clean, modern, and responsive design that ensures a good user experience across devices. Form fields and buttons are styled for clarity and ease of use. Animations and hover effects enhance user interaction, making the application feel dynamic and engaging. The documentation section is easily accessible, providing clear instructions on using the application and API.

### Built on Next.js for scalability

The application is built using Next.js, a powerful React framework that enables server-side rendering and static site generation, providing excellent performance and SEO benefits. Next.js supports API routes, allowing the backend and frontend to be managed within the same codebase, simplifying development and deployment. Its ability to handle large-scale applications makes it ideal for this project.

### Prisma for schema and database management

Prisma is used for database management, providing a type-safe query builder that simplifies database interactions and ensures data integrity. Prisma's schema definition language makes it easy to define and manage the database schema, allowing for smooth migrations and updates. The integration with SQLite provides a lightweight and efficient database solution suitable for development and testing. 

# Submission

Fork this repository and create a pull request for your branch back into
this repo once completed.
