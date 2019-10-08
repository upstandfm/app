import axios from 'axios';

const { REACT_APP_API_DOMAIN } = process.env;

const api = {
  /**
   * Create a new standup.
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {Object} data - Standup data
   *
   * @return {Promise} Axios res with created standup
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  createStandup(token, cancelToken, data) {
    return axios({
      method: 'post',
      url: `${REACT_APP_API_DOMAIN}/standups`,
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
