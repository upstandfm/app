import React from 'react';

/**
 * Custom hook to create a media recorder from a media stream.
 *
 * @param {Object} stream - MediaStream
 * @param {Function} onNewRecording - Callback that's called whenever there's a new recording
 *
 * For more info see:
 * - https://developer.mozilla.org/en-US/docs/Web/API/MediaStream
 * - https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
 */
function useRecordAudio(stream, onNewRecording) {
  const [mediaRecorder, setMediaRecorder] = React.useState(null);
  const [recorderErr, setRecorderErr] = React.useState(null);
  const [isRecording, setIsRecording] = React.useState(false);

  const chunks = React.useRef([]);

  React.useEffect(() => {
    if (!window.MediaRecorder) {
      const err = new Error('MediaRecorder API not supported');
      setRecorderErr(err);
    }
  }, []);

  React.useEffect(() => {
    if (!stream.id) {
      return;
    }

    let recorder;
    try {
      recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
    } catch (err) {
      setRecorderErr(err);
      return;
    }

    // Recorder event listeners

    const onError = e => {
      setRecorderErr(e.error);
    };

    const onDataAvailable = e => {
      if (e.data.size > 0) {
        chunks.current.push(e.data);
      }
    };

    const onStart = () => {
      setIsRecording(true);
    };

    const onStop = () => {
      const blob = new Blob(chunks.current);
      if (onNewRecording && typeof onNewRecording === 'function') {
        onNewRecording(blob);
      }

      chunks.current = [];

      setIsRecording(false);
    };

    recorder.addEventListener('error', onError);
    recorder.addEventListener('dataavailable', onDataAvailable);
    recorder.addEventListener('start', onStart);
    recorder.addEventListener('stop', onStop);

    return () => {
      if (!recorder) {
        return;
      }

      recorder.removeEventListener('error', onError);
      recorder.removeEventListener('dataavailable', onDataAvailable);
      recorder.removeEventListener('start', onStart);
      recorder.removeEventListener('stop', onStop);
    };
  }, [stream.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const startRecording = () => {
    try {
      mediaRecorder.start();
    } catch (err) {
      setRecorderErr(err);
    }
  };

  const stopRecording = () => {
    try {
      mediaRecorder.stop();
    } catch (err) {
      setRecorderErr(err);
    }
  };

  return [startRecording, stopRecording, recorderErr, isRecording];
}

export default useRecordAudio;
