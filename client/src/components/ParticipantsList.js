import React from 'react';
import { useSelector } from 'react-redux';

const ParticipantsList = () => {
  const participants = useSelector((state) => state.call.participants);

  return (
    <div>
      <h3>Participants</h3>
      <ul>
        {participants.map((participant) => (
          <li key={participant.identity}>{participant.identity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantsList;
