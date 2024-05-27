# Deployment Instructions 
1. You will first need to install docker or docker desktop.
2. Clone the repo locally.
3. Navigate to the root folder of the repo.
4. run """docker compose up""".
5. wait a couple of minutes then navigate to your browser to localhost:5173.

If the database folder at the root of the repo doesn't exist or is empty then create it calling the folder "database", then run """docker compose up""" (the server will exit, that is expected), then navigate to localhost:8081 and create a database called CSF_Takehome. Now just kill the containers then Run """docker compose up --build --force-recreate""", then just navigate to localhost:5173 and it should work.

# Bonus Points

## Discuss how the application and api could be extended and improved.
- The UI could be improved with better styling and adding better mobile support as currently, you will need to scroll to see the entire table. 
- The API could be broken up into multiple files but for now, there isn't enough code to justify doing that. 
- We could replace the constants I set at the top of the API code with a .env file which would be much better as it separates the variables from the code.
- The connection to the database isn't secure right now, which is fine if everything is running on one server, but would be an issue if we deploy the database on a separate server.
- Clean up the dockerfiles so they only copy the required files.

## Discuss how the application and api should be deployed.
I already created a docker-compose file as well as dockerfiles for this repo so we could use that on one server, depending on the traffic this will most likely be very overkill even with the least costly VM option on GCP compute engine or aws ec2, but unless there is a cheaper hosting solution for the database and we don't expect much traffic then this probably will be best, though there is the issue of everything running on one VM where if one of the parts breaks it might take down the other services as well. 

If there is a cheaper solution for the database then it would be cheaper to use gcp cloud run (or something similar) for the server. 

Also regardless of either solution, the frontend should probably be put on a CDN such as Cloudflare pages or s3 Static Web Hosting as that will minimize bandwidth costs and remove the unnecessary system usage from the server and/or database VM(s).
