import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import SearchButton from '../components/SearchButton';
import * as qs from 'qs';
import { useParams, useNavigate } from 'react-router-dom';

const CLIENT_ID = "";
const CLIENT_SECRET = "";

const ShowSong = () => {
  const [accessToken, setAccessToken] = useState("");
  const [song, setSong] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [artistUrl, setArtistUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // var auth = {
    //   method: 'POST',
    //   headers: {
    //           'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //   body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret='+ CLIENT_SECRET
    // }
    setLoading(true);
    axios
      .get(`http://localhost:5555/songs/${id}`)
      .then((response) => {
        setSong(response.data);
        setLoading(false);
        console.log("line 32")
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    };
    const data = {
      grant_type: 'client_credentials',
    };
    //API Access Token
    axios
    .post('https://accounts.spotify.com/api/token',
    qs.stringify(data),
    headers
    )
    // fetch('https://accounts.spotify.com/api/token', auth)
    .then((response) => {
      console.log(response.data.access_token)
      setAccessToken(response.data.access_token)
    })
  }, [])

  //Search
  const search = () => {
    console.log("line 53 " + song.artist)
    console.log("Searching for "+ song.artist); 
    //Get Artist ID
    var artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    // var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', artistParameters)
    // .then(response => response.json())
    // .then(data => console.log(data))
    var artistId = axios
    .get('https://api.spotify.com/v1/search?q=' + song.artist + '&type=artist',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    }
    )
    .then((response) => {
        console.log('artist: ' + response.data.artists.items[0].external_urls.spotify);
        window.location.href = response.data.artists.items[0].external_urls.spotify;
    }
    )
     
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Song</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{song._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{song.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Artist</span>
            <span>{song.artist}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Practice Start Date</span>
            <span>{song.startDate}</span>
          </div>
          <button className='p-2 bg-sky-300 m-8' onClick={search}>
          View Artist on Spotify
        </button>
        </div>
      )}
    </div>
  )
}

export default ShowSong