import axios from 'axios';

const { REACT_APP_API_DOMAIN } = process.env;

const api = {
  /**
   * Create a pre-signed file upload URL.
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {String} standupId
   * @param {Object} file - File
   * @param {String} name - Display name metadata
   *
   * @return {Promise} Axios res with pre-signed URL
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  createPreSignedUploadUrl(token, cancelToken, standupId, file, name) {
    return axios({
      cancelToken,
      method: 'post',
      url: `${REACT_APP_API_DOMAIN}/files/standup-update/upload`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        standupId,
        mimeType: file.type,
        filename: file.name,
        name
      }
    });
  },

  /**
   * Upload the file directly to blob storage, using a signed URL.
   *
   * @param {String} preSignedUrl - Pre-signed upload URL
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {Object} file - File
   * @param {String} name - Display name metadata
   * @param {Function} onUploadProgress - Callback
   *
   * @return {Promise} Axios res
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  uploadFile(preSignedUrl, cancelToken, file, name, onUploadProgress) {
    return axios({
      cancelToken,
      method: 'put',
      url: preSignedUrl,
      headers: {
        'Content-Type': file.type,
        'x-amz-meta-name': name
      },
      data: file,
      onUploadProgress
    });
  }
};

export default api;
