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

For this assessment, I decided to build a workout playlist generator. In my application, users can enter up to 5 genres, artists, or songs, as well as a lower and upper range of bpm (beats per minute) and receive a list of songs based on the entered preferences and tempo range. It makes use of a rest API built with node, express, and MongoDB, as well as the Spotify web API. A problem I ran into when developing this application was the security of Spotify's web API, which uses an OAuth 2.0 framework. Using the services of Spotify's web API requires an access token, which expires after one hour. Ideally, users could log in to spotify through the application itself in order to use the application. I also think the process of entering artists and songs could be more uer friendly. Currently, the endpoint for playlist recommendations can only use Spotify ID numbers for artists and tracks, but this could be solved by combining it with the search endpoint. Using the search endpoint, users can simply enter the name of a song or artist, and the and confirm the first result before submitting the form. Lastly, there are many error cases that should be handled by the application, such as making sure the minimum bpm is lower than the maximum bpm, and making sure the entered genre is valid.

## Discuss how the application and api should be deployed

The following steps need to be taken to deploy this application:
1. Choose a Hosting Provider: AWS Lambda or Herou would work well
2. Configure the reverse proxy with Nginx
3. Set up a continuous integration/deployment pipeline
4. Make sure the database is set up properly and backed up

## Intuitive design and user interface

# Submission

Fork this repository and create a pull request for your branch back into
this repo once completed.
