import React, { useEffect, useState } from 'react';
import TutList from './TutList';

const ServerTutorials = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/getArtTutorials', {
            method: 'GET', 
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setVideos(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []); 

    return (
        <div className='tutcontainer'>
      <div className="tutitem"><TutList videos={videos} /></div>
    </div>
    );
}

export default ServerTutorials;