import React from 'react';
import YouTube from 'react-youtube';

const VideoList = ({ videos }) => {
  return (
    <div className="video-list">
      {videos.map(video => (
        <div className="video-item" key={video.id.videoId}>
          <YouTube
            videoId={video.id.videoId}
            opts={{ width: '320', height: '180' }}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoList;