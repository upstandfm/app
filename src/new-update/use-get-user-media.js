import React from 'react';

/**
 * Custom hook to get access to a user's media devices.
 *
 * For more info see:
 * - https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
 * - https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
 * - https://developer.mozilla.org/en-US/docs/Web/API/MediaStream
 */
function useGetUserMedia() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [err, setErr] = React.useState(null);
  const [userMediaStream, setUserMediaStream] = React.useState(null);

  React.useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const err = new Error('getUserMedia API not supported');
      setErr(err);
    }
  }, []);

  const stream = React.useRef();

  React.useEffect(() => {
    stream.current = userMediaStream;
  });

  React.useEffect(function closeStreamOnUnmount() {
    return () => {
      const currentStream = stream.current;

      if (!currentStream) {
        return;
      }

      const tracks = currentStream.getAudioTracks();

      if (!tracks || !tracks.length) {
        return;
      }

      tracks.forEach(track => track.stop());
    };
  }, []);

  const getUserMedia = async constraints => {
    try {
      setIsLoading(true);

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setUserMediaStream(stream);

      setIsLoading(false);
    } catch (err) {
      // For all exceptions see:
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Exceptions
      setErr(err);
      setIsLoading(false);
    }
  };

  return [getUserMedia, isLoading, err, userMediaStream];
}

export default useGetUserMedia;
