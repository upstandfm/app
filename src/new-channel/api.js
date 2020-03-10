import axios from 'axios';

const { REACT_APP_API_DOMAIN } = process.env;

const api = {
  /**
   * Create a new channel.
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {Object} data - Channel data
   *
   * @return {Promise} Axios res with created channel
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  createChannel(token, cancelToken, data) {
    return axios({
      method: 'post',
      url: `${REACT_APP_API_DOMAIN}/channels`,
      cancelToken,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
  }
};

export default api;
