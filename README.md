# To Run code 
- clone repo
- install requirements.txt
- run code
- Navigate to http://127.0.0.1:5000 or visit hosted version at https://cianquiz.azurewebsites.net
-to view requests submitted add /get or get/id
-to submit request send post request with JSON with format
{
  "name": "John Doe",
  "category": "Science",
  "q_type": "Multiple Choice",
  "difficulty": "Medium"
}

Bonus Questions

Discuss how the application and api could be extended and improved

The application could be improved by ranking users based on scores. The API could be improved be also saving users score.


Discuss how the application and api should be deployed

The application and API were deployed using Azure Webapps however they could also have been deplyed by an apache server




