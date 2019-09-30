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
  const [isLoading, setIsLoading] = React.useState(true);
  const [mediaErr, setMediaErr] = React.useState(null);
  const [mediaStream, setMediaStream] = React.useState({});

  const getMediaStream = async constraints => {
    try {
      setIsLoading(true);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia API not supported');
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMediaStream(stream);
      setIsLoading(false);
    } catch (err) {
      // For all exceptions see:
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Exceptions
      setMediaErr(err);
      setIsLoading(false);
    }
  };

  return [getMediaStream, isLoading, mediaErr, mediaStream];
}

export default useGetUserMedia;
