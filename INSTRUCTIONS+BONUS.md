# Intro

This is contains a web app that queries from [Open Trivia Database](https://opentdb.com/) for trivia questions and stores user's answers in our backend server.

The backend server is located in the `my_server` directory.

- Backend uses `express.js` and `sqlite3`.

The frontend web application is located in the `my-app` directory.

- Frontend is a `react` based web application.

Each directory contains it's own `README.md` file that tells you how to install and run it. As well as note-worthy files and extra documentation.

## How can the application and api be extended and improved

We split improvements to a few main categories and can be prioritized based on business requirements:

### Security

- Our API should split it's routes into two, one for private and one for public access.
  - Ex. `/public/api/v1/`
    - Allows only `GET` or readonly requests
  - Ex. `/private/api/v1/`
    - Allows all other requests that can add/remove/modify our database
    - Can be authenticated using a `JWT` middleware
    - Cors can also be set to only allow access from trusted domains (our own)
- Currently base url for `http://localhost` is defined within the code. We want to pull this from environment variables after deploying to avoid exposing sensitive endpoints in our code.
- We should include the node package [`helmet`](https://www.npmjs.com/package/helmet) to secure our endpoints from a large variety of potential security risks.

### Scaleability

- Once our `RecordController.js` gets coupled, we could potentially extract out the database calls and create a wrapper for controlling our database queries. This will also help if we want to migrate to a different database such as MongoDB.
- Currently our web app will make a request for all rows in the database and filter the results in-client. This makes our user queries blazingly fast but will not be sustainable once our database grows in size. Luckily our backend endpoint at `GET /api/v1/records` already accepts query params to narrow down our search to select only the rows we need. It would be very easy to implement this since our structure already allows for this scaling.
  - Additionally, we can look to implement paging in our queries once our database gets really, and I mean really, big. This can be done using the sql `LIMIT` clause, ordering results, and doing a row comparison on the column being ordered.

### Stability

- Start using unit tests early on. This will also greatly improve tech debt as waiting until later to implement tests will cost us a massive amount of time, it's better to quickly turn a prototype into a test-driven development cycle as soon as possible. I highly recommend the framework [`Jest`](https://www.npmjs.com/package/jest).
- We will want to include a logger than will improve observability, allow us to catch bugs and malicious actors quickly. I highly recommend the middleware package [`morgan`](https://www.npmjs.com/package/morgan).
- Implement a custom error handling middleware. This should also be paired with a good logger such as the above point. This is improve robustness of our code and enhance developer experience for anyone working with our API.
- We could consider rate limiting our endpoints if our server is experiencing major slowdowns.

### Cleanliness (Tech debt)

- We should create API documentation especially if we want multiple services potentially consuming our API. I highly recommend [`Swagger`](https://swagger.io/) as it's fast and can easily auto-generate web docs for other team members to view.

## How should the application and api be deployed

- We should decide on a CI/CD pipeline to use such as `GoCD`. This allows observability if any errors occur during deployment.
- Infrastructure as Code may also be setup using Docker. This grants freedom to change up our infrastructure by changing a few lines of code and by using Docker our testing and functinality can remain consistent with what devs see on their machines.
- Servers can be hosted on various popular cloud services
  - Amazon Web Services (AWS) - Most powerful and flexible but is complicated to setup and tricky to manage costs
  - Vercel - A wrapper around AWS with a simplified interface and consistent monthly cost
  - Microsoft Azure - Similar to AWS but microsoft, ideal for AI and computation heavy tasks
  - Heroku - Budget option for hosting apps and servers. Cheap and predictable cost as you scale.
  - And many more!
- Code can also be hosted on github and via Github Actions be sent to an above cloud service whenever the main branch recieves updates.

## Intuitive design and user interfaces

I like to follow [Material Design](https://m3.material.io/). But preferably we have a separate UI/UX design team that drafts designs using a framework such as [Figma](https://www.figma.com/), which we can then import into a web application and provide functionality.
