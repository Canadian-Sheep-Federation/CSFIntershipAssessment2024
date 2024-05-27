import React, { useState } from 'react';
import axios from 'axios';

export default function Form({ togglePanes }) {
    const [songName, setSongName] = useState('');
    const [rating, setRating] = useState('');
    const [comments, setComments] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { songName, rating, comments };
        try {
            await axios.post('http://localhost:3001/api/forms', data);
            console.log('Song submitted successfully');
            setSongName('');
            setRating('');
            setComments('');
        } catch (error) {
            console.error('Error submitting song:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <button
                type="button"
                onClick={() => togglePanes('search')}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
            >
                Back to search
            </button>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Song Name:</label>
                    <input
                        type="text"
                        className="border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full"
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Rating:</label>
                    <input
                        type="number"
                        className="border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                        min="1"
                        max="5"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Comments:</label>
                    <textarea
                        className="border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
