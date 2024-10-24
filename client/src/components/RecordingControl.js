import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRecordingStatus } from '../store/slice';

const RecordingControl = ({ room }) => {
  const isRecording = useSelector((state) => state.call.isRecording);
  const dispatch = useDispatch();

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      await room.stopRecording();
      dispatch(setRecordingStatus(false));
    } else {
      // Start recording
      await room.startRecording();
      dispatch(setRecordingStatus(true));
    }
  };

  return (
    <div>
      <button onClick={toggleRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default RecordingControl;
