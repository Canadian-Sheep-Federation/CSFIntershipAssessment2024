# CSF Intership Assessment 2024

If you are interested in an internship opportunity with the Canadian Sheep Federation for Summer 2023, please complete the tasks outlined in the .md file relevant to what you are interested in doing this summer.

E.g. those interested in QA should complete the QA assignment.

Using the public API omdbapi, this program is a form that allows users to review movies after finding a poster of them on the public API

To get a live DEMO -> https://evilewawa.github.io/Canadian-Sheep-Federation-Software-Developer-Assessment-Stack/
This is published by putting the backend (connected to a MongoDB cluster) on render.com and the frontend hosted by github

BACKEND contains API files
FRONTEND contains webpage files

How to use API:
API URL = "https://csf-api-maaz.onrender.com"
Get All reviews -> API URL/
Get Specifc Review -> API URL/:ID of Review
Post A Review -> API URL/, method="POST", body = {
	"rating":Number,
	"text":String,
	"movieName":String
}, -> will return JSON object with message containing ID of review posted

## Discuss how the application and api could be extended and improved

The application could be improved by using React on the frontend. This would allow for more dynamic visuals and cleaner scaling. On a previous website, I had to use 
flatlists for displaying database content because otherwise too much data would crash the site. This has no such precautions and this could cause problems with scaling.
React would also just make it look nicer. Another extension would be to allow the users to find multiple suggestions after looking for something via the IMDB, 
and click on the posters to select their movie of choice. This would also open the door to seeing similar reviews of a specific movie as an extension.
An extension to the api would be how the reviews can be retrieved by more queries such as by movie or by rating. This would allow for more customizability and be a 
more helpful API overall. Other improvements would include using targeted searching with more options for querying through movie names or year to reduce the traffic on the api.
Limiting user postings, or requiring email to send in a review would also help reduce traffic and protect from spamming the api.

## Discuss how the application and api should be deployed

The api can be deployed as a web service on a hosting service (AWS, Azure, etc.) and can be accessed via that URL. I chose render because it is free.
The application can be deployed as a static site, however a limitation to this is that the progression through the site is linear so subsites cannot be accessed easily.
