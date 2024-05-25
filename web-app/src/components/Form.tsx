import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, List, ListItem, ListItemText, Typography, Rating } from '@mui/material';

interface SearchResult {
    show: {
        id: number;
        name: string;
        summary: string;
    };
}

const Form: React.FC = () => {
    const [showTitle, setShowTitle] = useState<string>('');
    const [rating, setRating] = useState<number | null>(null);
    const [review, setReview] = useState<string>('');
    const [showSearch, setShowSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    /** Search for provided show */
    const handleSearch = async () => {
        try{
            const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${showSearch}`);
            setSearchResults(response.data);
        } catch(error){
            console.log(error);
        }
    };

    /** Save Review to Database */
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/review', {showTitle: showTitle, rating: rating, review: review});
            alert("Review Saved!");
            setShowTitle('');
            setRating(null);
            setReview('');
        } catch (error) {
            alert("An Error Occurred when Submitting the review.");
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'top',
                height: '100vh',
                backgroundColor: '#f0f0f0',
            }}
        >
            <Typography variant="h3" component="h1" gutterBottom sx={{marginTop: "2rem"}}>
                    Review a Show
            </Typography>
            <Box
                sx={{
                    border: '1px solid #ccc',
                    padding: '2rem',
                    borderRadius: '1rem',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '400px',
                    mb: '2rem',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Search for a Show
                </Typography>
                <TextField
                    label='Search Show'
                    value={showSearch}
                    onChange={(e) => setShowSearch(e.target.value)}
                    variant='outlined'
                    required
                    style={{ marginBottom: '1rem' }}
                />
                <Button 
                    onClick={handleSearch}
                    variant='contained'
                    color='primary'
                    style={{ marginBottom: '1rem' }}
                >
                    Search
                </Button>
                {searchResults.length > 0 && (
                    <Box
                        sx={{
                            maxHeight: '200px',
                            overflowY: 'auto',
                            width: '100%',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '0.5rem',
                            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                        }}
                    >
                        <List>
                            {searchResults.map(result => (
                                <ListItem button key={result.show.id} onClick={() => setShowTitle(result.show.name)}>
                                    <ListItemText 
                                        primary={result.show.name} 
                                        secondary={<span dangerouslySetInnerHTML={{ __html: result.show.summary }} />} 
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </Box>
            <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '2rem', borderRadius: '1rem', backgroundColor: '#ffffff', flexDirection: 'column', display: 'flex', width: '400px' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Review
                </Typography>
                <TextField
                    label='Show Title'
                    value={showTitle}
                    onChange={(e) => setShowTitle(e.target.value)}
                    variant='outlined'
                    required
                    style={{ marginBottom: '1rem' }}
                />
                <Rating
                    name="show-rating"
                    value={rating}
                    size="large"
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                    sx={{ marginBottom: '1rem', fontSize: "5rem"}}
                />
                <TextField
                    label='Review'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    variant='outlined'
                    required
                    multiline
                    rows={4}
                    style={{ marginBottom: '1rem' }}
                />
                <Button 
                    type='submit'
                    variant='contained'
                    color='primary'
                >
                    Submit
                </Button>
            </form>
        </Box>
    );
}

export default Form;
