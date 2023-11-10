import React from 'react';
import YouTube from 'react-youtube';

const TutList = ({ videos }) => {
  return (
    <div className="video-list">
      {videos.map(video => (
        <div className="video-item" key={video.videoId}>
          <YouTube
            videoId={video.videoId}
            opts={{ width: '320', height: '180' }}
          />
        </div>
      ))}
    </div>
  );
};

export default TutList;