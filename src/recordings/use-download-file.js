import React from 'react';
import axios from 'axios';

import { useAuth0 } from '../auth0';

import api from './api';

/**
 * Custom hook to download a file.
 *
 * @param {Function} onDownloadFileProgress - Callback that's called when there's download progress
 * @param {Function} onDownloadedFile - Callback that's called when a file has been downloaded
 *
 * @return {Array}
 */
function useDownloadFile(onDownloadFileProgress, onDownloadedFile) {
  const { getToken } = useAuth0();

  const [err, setErr] = React.useState(null);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  /**
   * Download a file.
   *
   * @return {Object} File URL
   */
  const downloadFile = async recording => {
    try {
      // Set progress to "1%"" immediately when a download starts
      onDownloadFileProgress(recording, 1);

      const _onProgress = e => {
        const percentage = Math.round((100 * e.loaded) / e.total);

        if (
          onDownloadFileProgress &&
          typeof onDownloadFileProgress === 'function'
        ) {
          onDownloadFileProgress(recording, percentage);
        }
      };

      setErr(null);

      const token = await getToken();
      const res = await api.createPreSignedDownloadUrl(
        token,
        source.token,
        recording.transcodedFileKey
      );

      const { url: signedUrl } = res.data;
      const { data: blob } = await api.downloadFile(
        signedUrl,
        source.token,
        _onProgress
      );

      if (onDownloadedFile && typeof onDownloadedFile === 'function') {
        const fileUrl = URL.createObjectURL(blob);
        onDownloadedFile(recording, fileUrl);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }

      const { response = {} } = err;
      const { data } = response;
      setErr(data ? data : err);
    }
  };

  return [downloadFile, source.cancel, err];
}

export default useDownloadFile;
