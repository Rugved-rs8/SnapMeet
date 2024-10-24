import React, { useEffect, useRef } from 'react';
import { Track } from 'livekit-client';

const VideoStream = ({ participant }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Listen to participant's track publications
    participant.on('trackSubscribed', (track) => {
      if (track.kind === Track.Kind.Video && videoRef.current) {
        track.attach(videoRef.current);
      }
    });

    participant.on('trackUnsubscribed', (track) => {
      if (track.kind === Track.Kind.Video && videoRef.current) {
        track.detach(videoRef.current);
      }
    });

    // Cleanup on component unmount
    return () => {
      participant.tracks.forEach((trackPub) => {
        if (trackPub.track && trackPub.track.kind === Track.Kind.Video) {
          trackPub.track.detach();
        }
      });
    };
  }, [participant]);

  return (
    <div>
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default VideoStream;
