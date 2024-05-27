import Card from './Card';
import React, { useState } from 'react';


export default function Search({ togglePanes }) {

    const [results, setResults] = useState([]);

    async function search(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const formData = new FormData(event.target); // Access the form data
        const query = formData.get("query");
        console.log(query);

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
              headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}`,
              },
            });
            const data = await response.json();
            console.log(data);
            setResults(data.tracks.items);
            console.log(results);
          } catch (error) {
            console.error('Error searching Spotify:', error);
          }
    }
    return (
        <div flex>
          <div className='flex justify-between'>
              <form onSubmit={search} className="max-w-sm mx-auto flex">
                <input
                    name="query"
                    className="flex-1 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-2"
                    placeholder="Enter song name"
                />
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                >
                    Search
                </button>
            </form>
            <button
                type="button"
                onClick={() => togglePanes('form')}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
            >
                Write a review
            </button>
            <button
                type="button"
                onClick={() => togglePanes('reviews')}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
            >
                See all reviews
            </button>
          </div>

            <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {results.map((track) => (
                    <Card key={track.id} track={track} />
                ))}
            </ul>
        </div>
    );
  }
  