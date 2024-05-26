'use client'
import { useState } from 'react';
import {Button, ButtonGroup} from "@nextui-org/button";
import Link from 'next/link';

const Form = ( {searchParams}: any) => {
    const [method, setMethod] = useState('');
    const [rating, setRating] = useState(0);
    const [recommend, setRecommend] = useState(false);
    var image = searchParams.search;
    console.log(image);

    const handleSubmit = () => {
        
        // Prepare the data to be sent to the API
        const formData = {
            image,
            method,
            rating,
            recommend,
        };
        console.log(JSON.stringify(formData));
        // Send the data to the API
        fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the API response
                console.log(formData);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
            
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'black', color: 'white' }}>
            <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '5px', color: 'black' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                    <label style={{ marginBottom: '10px', textAlign: 'left' }}>
                        Method:
                        <br />
                        <input type="text" value={method} onChange={e => setMethod(e.target.value)} style={{ visibility: 'visible' }} />
                    </label>
                    <label style={{ marginBottom: '10px', textAlign: 'left' }}>
                        Rating:
                        <br />
                        <input type="range" min={1} max={10} value={rating} onChange={e => setRating(Number(e.target.value))} style={{ visibility: 'visible' }} />
                        <span style={{ marginLeft: '10px' }}>{rating}</span>
                    </label>
                    <label style={{ marginBottom: '10px', marginRight: '100px', alignItems: 'left', textAlign: 'left' }}>
                        Recommend:
                        <br />
                        <input type="checkbox" checked={recommend} onChange={e => setRecommend(e.target.checked)} style={{ visibility: 'visible' }} />
                    </label>
                    
                </div>
                
                <Link href="/">
                <Button color="primary" onPress={() => handleSubmit()} >Submit</Button>
                </Link>
                <br /> <br />
                <Link href="/">
                <Button color="primary" >review another</Button>
                </Link>
            </form>
            
        </div>
    );
};

export default Form;