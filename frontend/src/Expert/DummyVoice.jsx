import React, { useRef, useState } from 'react';

function Example() {
  const [record, setRecord] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const audioRef = useRef(null);

  // const startRecording = () => {
  //   setRecord(true);
  // };

  // const stopRecording = () => {
  //   setRecord(false);
  // };

  // const onData = (recordedBlob) => {
  //   console.log('chunk of real-time data is: ', recordedBlob);
  // };

  // const onStop = (recordedBlob) => {
  //   console.log('recordedBlob is: ', recordedBlob);
  //   setAudioData(recordedBlob.blob);
  // };

  return (
    <div>
      <h2>dummy</h2>
      {/* <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#fff"
        backgroundColor="#fff"
      />
      <button onClick={startRecording} type="button">Start</button>
      <button onClick={stopRecording} type="button">Stop</button>
      {audioData && (
        <div>
          <audio controls ref={audioRef}>
            <source src={URL.createObjectURL(audioData)} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )} */}
    </div>
  );
}

export default Example;
