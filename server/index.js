import express from 'express';
import { AccessToken } from 'livekit-server-sdk';
import cors from 'cors';

const app = express();
app.use(cors());

const API_KEY = 'APIVt2zkfVnHxdw';
const API_SECRET = 'Wp6bSc5CFhfnBAItRC6NZInk6DfbE0XmUWkXcbtxLNp';

// Route to generate a token
app.get('/token', (req, res) => {
  const { roomName, participantName } = req.query;

  if (!roomName || !participantName) {
    return res.status(400).send('Room name and participant name are required');
  }

  // Create a new access token
  const at = new AccessToken(API_KEY, API_SECRET, {
    identity: participantName, 
    ttl: 3600,  // Token expiration in seconds (1 hour)
  });

  // Grant permission to join the room
  at.addGrant({ roomJoin: true, room: roomName });

  const token = at.toJwt();
  console.log('Generated Token:', token);
  res.json({ token });
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

