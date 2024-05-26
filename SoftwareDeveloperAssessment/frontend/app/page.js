'use client';
import { useState, useEffect } from 'react';

export default function Home() {
    // Declaring useState 
    const [catFact, setCatFact] = useState('');
    const [reviewId, setReviewId] = useState('');
    const [reviewResponse, setReviewResponse] = useState(null); 
    const [formResponses, setFormResponses] = useState([]);
    const [formData, setFormData] = useState({
        reviewerName: '',
        reviewText: '',
        reviewRating: 0,
        catFact: ''
    });

    // UseEffect to fetch data on load
    useEffect(() => {
        fetchCatFact();
        fetchReviews();
    }, []);

    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            catFact: catFact
        }));
    }, [catFact]);

    // Updates the changes in the input for the most up-to-date form data to be sent
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Function used to fetch data from external API
    const fetchCatFact = () => {
        fetch('https://meowfacts.herokuapp.com/')
            .then(response => response.json())
            .then(data => setCatFact(data.data[0]))
            .catch(err => console.error(err));
    };

    // GET request to fetch all reviews
    const fetchReviews = () => {
        fetch('http://localhost:3333')
            .then(response => response.json())
            .then(data => setFormResponses(data))
            .catch(err => console.error(err));
    };

    // Sends the form data via POST
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3333', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Form submitted successfully:', data);
                
                // Resets the cat fact and reviews to add the one just submitted
                fetchReviews();
                fetchCatFact();

                // Resets the form to add another review
                setFormData({
                    reviewerName: '',
                    reviewText: '',
                    reviewRating: 0,
                    catFact: ''
                });

            })
            .catch(err => console.error(err));
    };

    // Search Handler
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        findById();
    };

    // GET request to fetch review by ID
    const findById = () => {
        fetch(`http://localhost:3333/${reviewId}`)
            .then(response => response.json())
            // Checking for valid ID data returned from search
            .then(data => {
                if (data && data._id) {
                    setReviewResponse(data);
                } else {
                    setReviewResponse(null);
                }
            })
            .catch(err => {
                console.error(err);
                setReviewResponse(null);
            });
    };

    return (
        <div className='min-h-'>
            <h1 className='text-center text-5xl p-5'>Cat Fact Reviews</h1>

            <h2 className=' mt-5 text-xl text-center'>Random Cat Fact: </h2>

            <div className='mt-5 flex justify-center space-x-2 border-4 p-14 bg-sky-300'>
                <p className='text-xl text-white'> {catFact}</p>  
            </div>

            <section className='mt-10 rounded-xl bg-teal-100 w-2/4 mx-auto p-5 mb-20'>
                <div className=' mt-8 justify-center text-center'>
                    <h2 className='my-8'>What do you think of this fact?</h2>

                    <form onSubmit={handleSubmit} className=' w-56 flex flex-col mx-auto'>
                        <input className='text-center my-2' type="text" name="reviewerName" value={formData.reviewerName} onChange={handleChange} placeholder="Your name" required />
                        <textarea className='text-center my-2' name="reviewText" value={formData.reviewText} onChange={handleChange} placeholder="Your review" required />
                        <select className='text-center my-2' name="reviewRating" value={formData.reviewRating} onChange={handleChange} required>
                            <option value="">Select a rating</option>
                            <option value="1">1 - Not Cool</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5 - Very Cool</option>
                        </select>
                        <button className='text-lg bg-sky-500 text-white rounded-md' type="submit">SUBMIT</button>
                    </form>                
                </div>

                <div className=' mt-8 mb-14 justify-center text-center'>
                    <h2>Find Review by ID</h2>
                    <form onSubmit={handleSearchSubmit} className=' w-56 flex flex-col mx-auto'>
                        <input className='text-center my-2' type="text" value={reviewId} onChange={(e) => setReviewId(e.target.value)} placeholder="Enter review ID" />
                        <button className='text-lg bg-sky-500 text-white rounded-md' type="submit">SEARCH</button>
                    </form>
                </div>

                {reviewResponse && (
                    <div className='text-center'>
                        <h2 className='text-center text-xl my-5'>Review Found</h2>
                        <li key={reviewResponse._id} className='bg-green-200 w-[500px] mx-auto p-5 my-2 rounded-md'>
                            <div className='flex flex-col'>
                                <p className='text-2xl mb-2'>{reviewResponse.reviewerName}</p> 
                                <p className='text-sm'>{reviewResponse._id}</p>
                            </div>
                            <div className='flex flex-col'>
                                <p>{reviewResponse.catFact}</p>
                                <p> rated it {reviewResponse.reviewRating}/5: </p>
                                <p>{reviewResponse.reviewText}</p>
                            </div>
                        </li>
                    </div>
                )}

                <h2 className='text-center text-xl my-5'>Submitted Reviews</h2>

                <ul className='text-center '>
                    {formResponses.map(response => (
                        <li key={response._id} className='bg-green-200 w-[500px] mx-auto p-5 my-2 rounded-md'>
                            <div className='flex flex-col'>
                                <p className='text-2xl mb-2'>{response.reviewerName}</p> 
                                <p className='text-sm'>{response._id}</p>
                            </div>
                            <div className='flex flex-col my-6'>
                                <p>{response.catFact}</p>
                                <p className='mt-2'> rated it {response.reviewRating}/5: </p>
                                <p>They said : {response.reviewText}</p>
                            </div>
                        </li>
                    ))}
                </ul>                
            </section>
        </div>
    );
}
