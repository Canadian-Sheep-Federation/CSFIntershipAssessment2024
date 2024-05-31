# CSF Intership Assessment 2024

  

## Overview  

This is my project for the software development assessment. The website is a pokemon builder, it utilizes the **pokeAPI** to retreive data about pokemon and allows users to customize and create different information cards about them. Below I have attached a youtube video outlying the use case of the website + server

https://youtu.be/Fc72JbvgMNo

## Implementation

The project is split into 2 components: **frontend**, and **backend**:

### Frontend 
The front end is created using a **React** and **TypeScript** hosted on a **Vite** local environment. I have split up my front end in terms of components and views, where views make up a single webpage to be rendered and is comprised of one or more components.  Some additional packages I have used include **react-bootstrap** , and **react-h5-audioplayer**

### Server Endpoints

The server handles the following endpoints:

**/** :  renders the Homepage View
**/signup** : renders the Signup View. handles authentication of the user
**/login** : renders the Login View. Not fully implemented as of yet
**/dashboard** : renders the Dashboard View if authentication has been confirmed

### Backend

The back end uses express.js to query a Mongodb database and send it to the front end. The packages I used for the backend include **mongoose** for schema creation and updates to Mongodb, **CORS** for cross-platform communication and **body-parser** for handling post request bodies

### Server Endpoints

The server handles the following endpoints:

**GET /** : the default server startup endpoint 
**GET /:username** : gets the credentials for user <**username**>
**GET /dashboard/list** : gets all of the custom cards created by the user
**POST /:username** : receives the credendials of the user from the form and sends it to the **Credentials** collection
**POST /dashboard/:pokemon** : receives all data of the custom card and sends it to  **Pokemon** collection

## Code Instructions
to download and run the code do the following:
`git clone git@github.com:KaranBhullar/CSFIntershipAssessment2024-SoftwareDeveloper.git`

`cd /CSFIntershipAssessment2024-SoftwareDeveloper`

`cd .\backend\`
`npm install`
`node .\index.js`
`cd ..\frontend\`
`npm install`
`npm run dev`

**Please make sure that mongodb is running at mongodb://localhost:27017/**

## What can be improved 

To be completely frank, so much of this project can be improved on (and probably will be on my own time and after the interview process is over so as to not give myself an advantage over the other candidates)

In terms of the **frontend**, quite a bit of code is reused in different components and this comes from a lack of understanding of the **useContext()** react hook. If utilized correctly I would not have to "drill state down" and copy from other components. Additionally, another thing that could use improvement is the **CSS**. Since I would rather hand this in as soon as possible and not stall the submission like I have, there are some issues with the CSS that I would like to correct, for example the card sizes. Some of the cards are a bit smaller than others and this is due to the typing of the pokemon, some pokemon are multi-type and some are single-type. To correct this I would make the size of the card fixed. Additionally, if I had more time I would use **SASS** to implement my styles since the framework I used pairs extremely well with SASS and would save me a lot more time in the future

Secondly, the security is lacking quite a bit in two aspects: storing of credentials and session. The sensitive data in the credentials of the user is not encrypted (i.e. password). I would like to have encrypt the users password with the bcrypt module before sending it to the backend since the sooner the data is encrypted the less likely it is to be stolen via injection attack. The webpage could also improve greatly with the introduction of sessions, since the user should not have access to the "create team" tab until they are logged in. 
This web app attempts to implement a basic version of sessions with an auth variable checking to see if the user has signed up, however this is not robust or strong enough. I would like to have implemented token-based sessions for this project because it allows for the addition of more security measures that cookie-based sessions simply dont allow for, not to mention the fact it has less of a load on the server.

Moreover for the webapp itself, I would have liked to create a teambuilder aspect to this where a user can create a team of 6 using the custom pokemon they have made. Afterwards the user can view the team and some analytics of it i.e. what typing generally is strongest against the team as a whole, what typing is generally weakest against the team and the average stats of the team and what it would excel most at (i.e. sweeper, tank, etc)

I realize a lot of the previous paragraph probably does not make any sense unless you have some knowledge about pokemon and the underlying mechanics, but to be more clear this is relating to pokemon battles using the custom pokemon created by the user. This can be done by fetching more data from **PokeAPI** and adding additional information to my Pokemon Schema. the graphs generated can be done using **chart.js**