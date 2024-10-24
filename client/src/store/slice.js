import { createSlice } from '@reduxjs/toolkit';

const callSlice = createSlice({
  name: 'call',
  initialState: {
    participants: [],
    isRecording: false,
  },
  reducers: {
    setParticipants(state, action) {
      state.participants = action.payload;
    },
    setRecordingStatus(state, action) {
      state.isRecording = action.payload;
    },
  },
});

export const { setParticipants, setRecordingStatus } = callSlice.actions;
export default callSlice.reducer;
