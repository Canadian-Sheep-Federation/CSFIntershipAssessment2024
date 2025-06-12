import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [anime, setAnime] = useState('');
    const [query, setQuery] = useState(''); // User input for anime search
    const [results, setResults] = useState([]); // Search results from Jikan API
    const [recommended, setRecommended] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const fetchAnime = async () => {
        if (query.length < 2) return setResults([]);
        try {
            const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
            const data = await res.json();
            setResults((data?.data || []).slice(0, 20)); // Limit to 20 results
        } 
        catch (err) {
            console.error('Jikan API search error:', err);
            setResults([]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            fetchAnime();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await onSubmit({ name, anime, recommended, rating, comment });

            // Reset all fields after submit
            setName('');
            setAnime('');
            setQuery('');
            setRecommended('');
            setRating('');
            setComment('');
            setResults([]);
        }
        catch (err) {
            // Error handling
            console.error('Submit error:', err);
            alert('Failed to submit review. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{ display: 'block', marginBottom: 10, width: '100%' }}
            />

            <div className='anime-search' style={{ marginBottom: 10 }}>
                <input
                    placeholder="Search Anime"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress} // Handle Enter key
                    onBlur={fetchAnime} // Search on blur (lose focus)
                    style={{ display: 'block', marginBottom: 10, width: '100%' }}
                />
                <select
                    value={anime}
                    onChange={e => setAnime(e.target.value)}
                    required
                    style={{ width: '100%' }}
                >
                    <option value="">Select an anime</option>
                    {results.map(a => (
                    <option key={a.mal_id} value={a.title}>{a.title}
                    </option>
                    ))}
                </select>
            </div>

            <select
                value={recommended}
                onChange={e => setRecommended(e.target.value)}
                required
                style={{ display: 'block', marginBottom: 10, width: '100%' }}
                >
                <option value="">Recommended?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <input
                type="number"
                min="1"
                max="10"
                value={rating}
                onChange={e => setRating(parseInt(e.target.value))}
                placeholder="Rating (1-10)"
                required
                style={{ display: 'block', marginBottom: 10, width: '100%' }}
            />

            <textarea
                placeholder="Comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
                required
                style={{ display: 'block', marginBottom: 10, width: '100%' }}
            />

            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
