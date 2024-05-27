document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            age: formData.get('age'),
            favoriteStarWarsMovie: formData.get('favoriteMovie'),
            favoriteStarWarsMovieRating: formData.get('movieRating'),
            favoriteStarWarsCharacter: formData.get('favoriteCharacter'),
            favoriteStarWarsCharacterRating: formData.get('characterRating'),
        };

        
    });

   
});
