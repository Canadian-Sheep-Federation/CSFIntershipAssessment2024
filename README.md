# CSF Intership Assessment 2024

Creating an API for a weather tracking form using weatherstack public API to find weather of locations.

I designed this application with the idea that people can log their attivities and the program will automatically get the weather of that day in their particular location. This framework is easily expandable to explore what kind of activities people prefer to do in certain weather. 

I also wanted to pick something that could be expanded and used in the context of the Sheep Federation. If sheep are kept outside then it would be very important to track weather paterns of the area and what weather is best suited for the animals.

put their name
log their activity outside
log their location of activity
query weatherstack for current and forecast weather on their location
users can also look at all previous logs or individual logs by using the coresponding form ID.


------------------ To run ---------------------

Clone this directory on your terminal using git clone and the link to this repository. Then run the following on the terminal:

npm init -y

npm install express body-parser axios sqlite3

npm install lite-server

then run ---

node server.js


BONUS QUESTIONS:

------Discuss how the application and api could be extended and improved------
As stated previously this application could be expanded to be incorperated into a larger data analysis project. The goal of that project would be finding out what activities are best done in what weather. 
This interface could be a bit more user friendly, perhaps I could display more descriptive use cases for non tech savy users. For the individual form submission details I could display all the possible form submissions for users to visually decide what they want to see.

------Discuss how the application and api should be deployed------
For this kind of application which would be designed to be part of a larger project, using amazon web services would be more than reasonable to deploy this application. 

------Intuitive design and user interface------
The application lacks photographs and icons which would be helpful for users to navigate the system. However the system is rather smooth and simple so with a few tweaks this will be a great interface.
