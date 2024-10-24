import React, { useState, useEffect } from 'react';
import JoinRoom from './components/JoinRoom';
import VideoStream from './components/VideoStream';
import RecordingControl from './components/RecordingControl';
import './App.css';

function App() {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  const handleJoin = (joinedRoom) => {
    setRoom(joinedRoom);

    // Update participant list when new participants join or leave
    joinedRoom.on('participantConnected', (participant) => {
      setParticipants([...joinedRoom.participants.values()]);
    });

    joinedRoom.on('participantDisconnected', (participant) => {
      setParticipants([...joinedRoom.participants.values()]);
    });
  };

  const handleLeave = () => {
    if (room) {
      room.disconnect();
      setRoom(null);
      setParticipants([]);
    }
  };

  return (
    <div>
      <h1>SnapMeet</h1>
      <JoinRoom onJoin={handleJoin} onLeave={handleLeave} />
      {room && (
        <>
          <RecordingControl room={room} />
          {participants.map((participant) => (
            <VideoStream key={participant.sid} participant={participant} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
