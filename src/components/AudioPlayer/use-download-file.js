import React from 'react';
import axios from 'axios';

import { useAuth0 } from '../../auth0';

import api from './api';

/**
 * Custom hook to download a file.
 *
 * @param {Function} dispatch - Reducer dispatch function
 *
 * @return {Array}
 */
function useDownloadFile(dispatch) {
  const { getToken } = useAuth0();

  const [err, setErr] = React.useState(null);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const downloadFile = async (fileId, fileKey) => {
    try {
      const _onDownloadProgress = e => {
        const percentage = Math.round((100 * e.loaded) / e.total);

        dispatch({
          type: 'DOWNLOADING_AUDIO_FILE',
          data: {
            fileId,
            progress: percentage
          }
        });
      };

      setErr(null);

      dispatch({
        type: 'DOWNLOADING_AUDIO_FILE',
        data: {
          fileId,
          progress: 0
        }
      });

      const token = await getToken();
      const res = await api.createPreSignedDownloadUrl(
        token,
        source.token,
        fileKey
      );

      const { url: signedUrl } = res.data;
      const fileRes = await api.downloadFile(
        signedUrl,
        source.token,
        _onDownloadProgress
      );

      dispatch({
        type: 'DOWNLOADED_AUDIO_FILE',
        data: {
          fileId,
          fileUrl: URL.createObjectURL(fileRes.data)
        }
      });
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
