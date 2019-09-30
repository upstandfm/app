import React from 'react';

let chunks = [];

/**
 * Custom hook to create a media recorder from a media stream.
 *
 * @param {Object} stream - MediaStream
 * @param {Object} options
 *
 * For more info see:
 * - https://developer.mozilla.org/en-US/docs/Web/API/MediaStream
 * - https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
 */
function useRecordAudio(stream, options) {
  const [mediaRecorder, setMediaRecorder] = React.useState(null);
  const [recorderErr, setRecorderErr] = React.useState(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  React.useEffect(() => {
    if (!window.MediaRecorder) {
      const err = new Error('MediaRecorder API not supported');
      setRecorderErr(err);
      return;
    }

    if (!stream.id) {
      return;
    }

    let recorder;
    try {
      recorder = new MediaRecorder(stream, options);
      setMediaRecorder(recorder);
    } catch (err) {
      setRecorderErr(err);
      return;
    }

    // Recorder event listeners

    const onError = e => setRecorderErr(e.error);

    const onDataAvailable = e => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    const onStart = () => setIsRecording(true);

    const onStop = () => {
      const blob = new Blob(chunks);
      chunks = [];

      const url = window.URL.createObjectURL(blob);
      setPreviewUrl(url);
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

  const startRecording = () => mediaRecorder.start();
  const stopRecording = () => mediaRecorder.stop();
  const resetPreview = () => setPreviewUrl(null);

  return [
    startRecording,
    stopRecording,
    resetPreview,
    recorderErr,
    isRecording,
    previewUrl
  ];
}

export default useRecordAudio;
