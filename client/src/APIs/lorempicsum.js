
// This will return a url for an image
export async function GetRandomImage () {
    let data = {};

    await fetch("https://picsum.photos/1920/1280?random=1")
    .then(async (response) => {
        if (response.status === 200) {
            data = response.url;
        }
    })
    .catch((error) => {
        console.log("network error " + error);
    });
    
    return data;
}