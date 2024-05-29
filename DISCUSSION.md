# Discuss how the application and api could be extended and improved
- Make it so people can query for a specific Ron Swanson quote using keywords
- Generate a different Ron Swanson image everytime a new quote is requested (no public api for this... :^/)
- Advanced -- get them a specific Ron Swanson quote or image based on their survey responses
- If they don't say their favourite animal is sheep, animate a little explosion and freeze the app so they have to reload :^D
- Allow them to favourite certain quotes and keep them in a bank

# Discuss how the application and api should be deployed
When I've worked with deploying code, it was usually done by my team lead -- so I'm not very familiar with the nitty gritty.
However, after doing some research, seems like we can use services like Amazon S3, Netlify, Vercel, etc. 
We would also have to run `npm build` to make the code production ready with an optimized build version.

# Intuitive design and user interface
- Make application prettier using CSS (especially the form and the list of all form responses)
- For yes/no questions use checkbox instead of input
- Indicate how long we expect a response to be