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
   * @param {String} metadata - File metadata
   *
   * @return {Promise} Axios res with pre-signed URL
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  createPreSignedUploadUrl(token, cancelToken, standupId, file, metadata) {
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
        metadata
      }
    });
  },

  /**
   * Upload the file directly to blob storage, using a signed URL.
   *
   * @param {String} preSignedUrl - Pre-signed upload URL
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {Object} file - File
   * @param {String} metadata - File metadata
   * @param {Function} onUploadProgress - Callback
   *
   * @return {Promise} Axios res
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  uploadFile(preSignedUrl, cancelToken, file, metadata, onUploadProgress) {
    // Any user defined metadata needs to be sent as a custom header
    // in the request using the signed URL to upload data.
    // This header must "match" the metadata "key" itself, i.e.
    // "x-amz-meta-:key".
    // For more info see: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html
    const metadataHeaders = Object.keys(metadata).reduce((headers, key) => {
      // Only set a metadata header when it has a value
      // AWS strips out "empty" metadata and if we set the header regardless,
      // there'll be a signature mismatch, preventing the upload request to
      // succeed
      const hasValue = Boolean(metadata[key]);
      if (hasValue) {
        headers[`x-amz-meta-${key}`] = metadata[key];
      }
      return headers;
    }, {});

    return axios({
      cancelToken,
      method: 'put',
      url: preSignedUrl,
      headers: {
        'Content-Type': file.type,
        ...metadataHeaders
      },
      data: file,
      onUploadProgress
    });
  }
};

export default api;
