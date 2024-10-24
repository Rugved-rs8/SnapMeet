import React, { useState } from 'react';
import axios from 'axios';
import { Room, createLocalTracks } from 'livekit-client';
import './JoinRoom.css';

const JoinRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [room, setRoom] = useState(null);
  const [isJoining, setIsJoining] = useState(false); // For disabling/enabling the Join button
  const [isMeetOn, setIsMeetOn] = useState(false);  // To track if the meeting is active

  const joinRoom = async () => {
    setIsJoining(true);  // Disable the join button while connecting
    try {
      const response = await axios.get('http://localhost:5000/token', {
        params: { roomName, participantName },
      });

      if (response.status === 200) {
        const { token } = response.data;
        console.log(token);

        const livekitRoom = new Room();
        await livekitRoom.connect('wss://snaphunt-buov51ky.livekit.cloud', token);

        const tracks = await createLocalTracks();
        livekitRoom.localParticipant.publishTracks(tracks);

        setRoom(livekitRoom);
        setIsMeetOn(true);  // Enable the leave button
      } else {
        console.error('Failed to get token from server');
      }
    } catch (error) {
      console.error('Error joining room:', error.message || error);
    } finally {
      setIsJoining(false);  // Re-enable the join button
    }
  };

  const leaveRoom = () => {
    if (room) {
      room.disconnect();
      setRoom(null);
      setIsMeetOn(false);  // Disable the leave button when meeting ends
    }
  };

  return (
    <div className="container">
      <h2>Join Room</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Your Name"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button className="join-btn" onClick={joinRoom} disabled={isJoining}>
          {isJoining ? 'Joining...' : 'Join'}
        </button>
        <button className="leave-btn" onClick={leaveRoom} disabled={!isMeetOn}>
          Leave
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;
