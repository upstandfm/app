import axios from 'axios';

const { REACT_APP_API_DOMAIN } = process.env;

const api = {
  /**
   * Get a single channel.
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {String} channelId
   *
   * @return {Promise} Axios res with channel data
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  getChannel(token, cancelToken, channelId) {
    return axios({
      method: 'get',
      url: `${REACT_APP_API_DOMAIN}/channels/${channelId}`,
      cancelToken,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default api;
