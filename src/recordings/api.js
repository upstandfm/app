import axios from 'axios';

const { REACT_APP_API_DOMAIN } = process.env;

const api = {
  /**
   * Create a pre-signed file download URL.
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {String} fileKey
   *
   * @return {Promise} Axios res with pre-signed URL
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  createPreSignedDownloadUrl(token, cancelToken, fileKey) {
    return axios({
      cancelToken,
      method: 'post',
      url: `${REACT_APP_API_DOMAIN}/files/audio/download`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        fileKey
      }
    });
  },

  /**
   * Download a file from blob storage, using a signed URL.
   *
   * @param {String} preSignedUrl - Pre-signed download URL
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {Function} onDownloadProgress - Callback
   *
   * @return {Promise} Axios res with file blob
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  downloadFile(preSignedUrl, cancelToken, onDownloadProgress) {
    return axios({
      cancelToken,
      method: 'get',
      responseType: 'blob',
      url: preSignedUrl,
      onDownloadProgress
    });
  }
};

export default api;
