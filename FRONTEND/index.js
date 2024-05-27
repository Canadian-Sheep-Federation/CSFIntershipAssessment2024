const search_results_div = document.getElementById("search_results");
const imdb_search_query_input  =document.getElementById("imdb_search_query")
const imdb_search_button = document.getElementById("imdb_search_button")
const name_input = document.getElementById("name_input")
const rating_input = document.getElementById("rating_input")
const description_input = document.getElementById("description_input")
const posted_data_div = document.getElementById("posted_data")
const all_data_div = document.getElementById("all_data")
const id_input = document.getElementById("id_input")
const specific_data_div = document.getElementById("specific_data")
const myAPI = "https://csf-api-maaz.onrender.com"


// posts the review to the API
async function postData () {
    let rating = parseInt(rating_input.value)
    let movie_name =name_input.value
    let description = description_input.value
    // creates the form for the post request
    if (rating && movie_name && description){
        const review = {
        rating: rating,
        movieName: movie_name,
        text: description
        }
        // sends the post request
        const response = await fetch(myAPI, {
        method: "POST",
        body: JSON.stringify(review),
        headers: {
            "Content-Type": "application/json"
        }
        })
        // checks if the request was successful
        if (!response.ok) {
        throw new Error(`Request failed with status ${reponse.status}`)
        }
        console.log("Request successful!")
        posted_data_div.innerHTML = "Posted"
        // clears the input fields
        rating_input.value = "";
        description_input.value = "";
        }
    else{
        posted_data_div.innerHTML = ""
        posted_data_div.innerHTML = "All fields are required"
    }
  }

// gets all the data from the API
async function getAllData(){
    const response = await fetch(myAPI)
    let text = await response.json()
    console.log(text)
    all_data_div.innerHTML = ""
    for (let i = 0; i < text.length; i++){
        // checks if the name input is empty or matches the movie name
        if (name_input.value == text[i].movieName || name_input.value == ""){
            // creates the review div
            let review = text[i]
            let review_div = document.createElement("div")
            review_div.classList.add("review")
            let id_p = document.createElement("p")
            id_p.innerText = review._id
            let movie_p = document.createElement("p")
            movie_p.innerText = review.movieName
            let rating_p = document.createElement("p")
            rating_p.innerText = "Rating: " + review.rating
            let description_p = document.createElement("p")
            description_p.innerText = review.text
            review_div.appendChild(id_p)
            review_div.appendChild(movie_p)
            review_div.appendChild(rating_p)
            review_div.appendChild(description_p)
            all_data_div.appendChild(review_div)
        }
    }
}

// gets the specific data from the API
async function getSpecificData(){
    if (id_input.value){
        const response = await fetch(myAPI + "/" + id_input.value)
        let text = await response.json()
        console.log(text)
        // fills in the specific data div with the review
        specific_data_div.innerHTML = ""
        let review = text[0]
        let review_div = document.createElement("div")
        review_div.classList.add("review")
        let id_p = document.createElement("p")
        id_p.innerText = review._id
        let movie_p = document.createElement("p")
        movie_p.innerText = review.movieName
        let rating_p = document.createElement("p")
        rating_p.innerText = "Rating " + review.rating
        let description_p = document.createElement("p")
        description_p.innerText = review.text
        // creates the review div
        review_div.appendChild(id_p)
        review_div.appendChild(movie_p)
        review_div.appendChild(rating_p)
        review_div.appendChild(description_p)
        specific_data_div.appendChild(review_div)
    }
    else{
        specific_data_div.innerHTML = "Field Required"
    }
}

// function to get data from the API (for now its just the poster)
async function getDataFromIMDB(){
    if (imdb_search_query_input.value){
        let fetch_query = "https://www.omdbapi.com/?t=" + imdb_search_query_input.value + "&apikey=af20e908";
        const response = await fetch(fetch_query)
        console.log("loading")
        // checks if the request was successful
        if (!response.ok) {
        throw new Error(`Request failed with status ${reponse.status}`)
        }
        console.log("Request successful!")
        let text = await response.json()

        // console.log(text.Poster)
        // Checks if poster exists and displays it
        if (text.Poster){
            let img = document.createElement("img")
            img.src = text.Poster
            img.height = 300
            search_results_div.innerHTML = ""
            search_results_div.appendChild(img)
        }
        else{
            search_results_div.innerHTML = ""
            search_results_div.innerHTML = "Image doesn't exist for this query"
        }
    }
    else{
        search_results_div.innerHTML = ""
        search_results_div.innerHTML = "Please input a movie"
    }
}

// functions to make sure both fields are the same value
function movieNameChange(){
    name_input.value= imdb_search_query_input.value
}
function nameChange(){
    imdb_search_query_input.value=name_input.value
}
