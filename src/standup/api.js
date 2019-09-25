import axios from 'axios';

const { REACT_APP_API_DOMAIN } = process.env;

const api = {
  /**
   * Get a single standup.
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {String} standupId
   *
   * @return {Promise} Axios res: https://github.com/axios/axios#response-schema
   */
  getStandup(token, cancelToken, standupId) {
    return axios({
      method: 'get',
      url: `${REACT_APP_API_DOMAIN}/standups/${standupId}`,
      cancelToken,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default api;
