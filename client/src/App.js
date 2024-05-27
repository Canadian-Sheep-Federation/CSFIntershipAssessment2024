import React, { useState, useEffect } from 'react';
import { GetRandomQuote } from './APIs/quote';
import { GetRandomImage } from './APIs/lorempicsum';
import './App.css';

let aVisible = true;
let changable = true;

function App() {
    const [quote, setQuote] = useState("");
    const [quoteAuthor, setQuoteAuthor] = useState("test");
    const [quoteGenre, setQuoteGenre] = useState("");

    const [backA, setBackA] = useState("");
    const [backB, setBackB] = useState("");
    
    const defImageClass = "back-image";
    
    const [AClass, setAClass] = useState(defImageClass + " faded-in");
    const [BClass, setBClass] = useState(defImageClass + " faded-out");

    useEffect(() => {
        GetQuote();
        InitImages();
    }, []);
    
    function toggleBackground () {
        // this function changes the background images
        if (!changable) { return; }
        changable = false;
        
        aVisible = !aVisible;
        
        setAClass(defImageClass + (aVisible ? " faded-in" : " faded-out"));
        setBClass(defImageClass + (aVisible ? " faded-out" : " faded-in"));
        
        setTimeout(async () => {
            // while one image is visible the other is hidden and replaced with a new image
            const image = await GetRandomImage();
            if (aVisible) {
                setBackB(image);
            } else {
                setBackA(image);
            }
        }, 1000);
        
        setTimeout(() => {
            // this prevents the images from changing before they have loaded from the api
            changable = true;
        }, 2000);
    }
    
    async function GetQuote () {
        const roll = Math.random();
        
        // we roll for either a database quote or a random one from the api
        let got;
        if (roll < 0.8) {
            got = await GetRandomQuote();
        } else {
            // in the future put this in a wrapper like the others
            await fetch('/random')
            .then(async (response) => {
                if (response.status === 200) {
                    got = await response.json();
                }
            })
            .catch((error) => {
                console.log("network error " + error);
            });
        }
        
        setQuote(got['text']);
        setQuoteAuthor(got['author']);
        
        // format the genre so it looks nicer
        let genre = got['genre'];
        genre = genre.charAt(0).toUpperCase() + genre.slice(1);
        
        setQuoteGenre(genre);
    }
    
    async function InitImages () {
        const imagea = await GetRandomImage();
        setBackA(imagea);
        
        const imageb = await GetRandomImage();
        setBackB(imageb);
    }
    
    async function SendFormData (event) {
        event.preventDefault();
        
        const data = {
            quote: event.target[0].value,
            author: event.target[1].value,
            genre: event.target[2].value
        };
        
        // make sure there is quote data
        if (data.quote === "" || data.author === "" || data.genre === "" ||
            data.quote === null || data.author === null || data.genre === null) {
            return;
        }
        
        await fetch('/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        setQuote(data.quote);
        setQuoteAuthor(data.author);
        setQuoteGenre(data.genre);
        
        toggleBackground();
    }
    
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <div style={{ zIndex: -2, position: 'absolute' }}>
                <img alt='Randomly generated from lorempicsum' className={AClass} src={backA}></img>
                <img alt='Randomly generated from lorempicsum' className={BClass} src={backB}></img>
            </div>
            
            <div className='vignette'>
                            
            </div>
            
            <div style={{ display: 'flex', gap: '5%', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <div className='card' style= {{ width: '50vw', height: '50vh' }}>
                    <div className='card-content'>
                        <div style={{ height: '95%', width: '100%' }}>
                            <div style={{ height: '80%' }}>
                                <p style={{ fontFamily: 'Times-Bold', fontSize: '2rem', fontWeight: 'bold', fontStyle: 'italic' }}>"{quote}"</p>
                            </div>
                            <p style={{ fontFamily: 'Times-Roman', fontWeight: 'bold', fontSize: '1.5rem', color: '#555' }}>{quoteAuthor}</p>
                            <p style={{ fontFamily: 'Times-Roman', fontWeight: 'bold', color: '#777' }}>{quoteGenre}</p>
                        </div>
                        
                        <button className='button' onClick={() => { GetQuote(); toggleBackground(); }}>New Quote</button>
                    </div>
                </div>
                
                <div className='card' style={{ width: '25vw', height: '50vh' }}>
                    <form className='quote-form' onSubmit={(event) => { SendFormData(event) }} style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Quote:</label>
                        <textarea className='quote-input' onChange={() => {}} rows={5} cols={100} type="text"></textarea>
                        
                        <label>Author:</label>
                        <textarea rows={1} cols={100} type="text" onChange={() => {}}></textarea>
                        
                        <label>Genre:</label>
                        <textarea type="text" rows={1} cols={100} onChange={() => {}}></textarea>
                        
                        <input className='submit' type="submit" value="Submit"></input>
                    </form>
                </div>
            </div>
            
            
        </div>
    );
}

export default App;
