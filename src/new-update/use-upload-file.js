import React from 'react';
import axios from 'axios';

import { useAuth0 } from '../auth0';

import api from './api';

/**
 * Custom hook to upload a file.
 *
 * @param {String} standupId
 * @param {String} updateId
 * @param {Function} dispatch - Reducer dispatch function
 *
 * @return {Array}
 */
function useUploadFile(standupId, updateId, dispatch) {
  const { getToken } = useAuth0();

  const [err, setErr] = React.useState(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const _onUpdateProgress = e => {
    const percentage = Math.round((100 * e.loaded) / e.total);
    if (uploadProgress !== percentage) {
      setUploadProgress(percentage);
    }
  };

  const uploadFile = async file => {
    try {
      setErr(null);

      const token = await getToken();
      const res = await api.createPreSignedUploadUrl(
        token,
        source.token,
        standupId,
        file
      );

      const { url: signedUrl } = res.data;
      await api.uploadFile(signedUrl, source.token, file, _onUpdateProgress);

      dispatch({
        type: 'UPLOADED_UPDATE_RECORDING',
        data: {
          id: updateId,
          isUploaded: true
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

  return [uploadFile, source.cancel, uploadProgress, err];
}

export default useUploadFile;
