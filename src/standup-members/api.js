import axios from 'axios';

const { REACT_APP_API_DOMAIN } = process.env;

const api = {
  /**
   * Get all standup members.
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {String} standupId
   *
   * @return {Promise} Axios res with members list
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  getStandupMembers(token, cancelToken, standupId) {
    return axios({
      method: 'get',
      url: `${REACT_APP_API_DOMAIN}/standups/${standupId}/members`,
      cancelToken,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default api;
