
// this will return a random quote with the format
// {
//      text: 'quote text',
//      author: 'quotes author',
//      genre: 'quotes genre'
// }
export async function GetRandomQuote () {
    let data = {};

    await fetch("https://quote-garden.onrender.com/api/v3/quotes/random")
    .then(async (response) => {
        if (response.status === 200) {
            data = await response.json();
        }
    })
    .catch((error) => {
        console.log("network error " + error);
    });
    
    if (Object.keys(data).length > 0) {
        const payload = {
            text: data['data'][0]['quoteText'],
            author: data['data'][0]['quoteAuthor'],
            genre: data['data'][0]['quoteGenre']
        };

        return payload;
    }
    
    return data;
}