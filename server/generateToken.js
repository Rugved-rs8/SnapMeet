import { AccessToken, VideoGrant } from 'livekit-server-sdk';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = 'APIVt2zkfVnHxdw';
const apiSecret = 'Wp6bSc5CFhfnBAItRC6NZInk6DfbE0XmUWkXcbtxLNp';

export function generateToken(roomName, participantName) {
  // Create a VideoGrant object for room interaction
  const grant = new VideoGrant({
    roomJoin: true, // Allows joining the room
    room: roomName, // Room name
    canPublish: true, // Allows publishing audio/video
    canSubscribe: true, // Allows subscribing to tracks
  });

  // Create a new access token
  const token = new AccessToken(apiKey, apiSecret, {
    identity: participantName, // Unique identifier for the participant
    ttl: 3600, // 1 hour expiration (optional)
  });

  // Add the video grant to the token
  token.addGrant(grant);

  // Return the signed JWT token as a string
  return token.toJwt();
}
