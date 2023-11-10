import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoList from './VideoList';
import "./Tutorial.css";
import "./Header/Header.css";
import TopNavBar from './TopNavBar';

const Tutorials= () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Fetch videos and set them in the state.
    // You can do this inside a useEffect or as needed.
    const API_KEY = 'AIzaSyDK2pp_ZBOGEV-BZt76whlzUYhaCJOAkEg';
    const SEARCH_QUERY = 'Learn to draw';

    axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
        key: API_KEY,
        q: SEARCH_QUERY,
        type: 'video', // Specify the type of content you want (video, playlist, channel).
        part: 'snippet',
        maxResults:20, // You can specify more parts to retrieve additional information.
    },
    })
    .then(response => {
        console.log(response.data.items);
    setVideos(response.data.items); // Handle the video data here.
    setLoading(false); // Set loading to false when videos are fetched.
    })
    .catch(error => {
    console.error(error);
    setLoading(false); // Handle loading state in case of error.
    });
  }, []);

  return (
    <>
    <div className='tutcontainer'>
      {/* <h1>Tutorials</h1> */}
      {loading ? (
        <div class="fancy-spinner">
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="dot"></div>
      </div>
      ) : (
        <div className="tutitem"><VideoList videos={videos} /></div>
      )}
    </div>
    </>
  );
};

export default Tutorials;
