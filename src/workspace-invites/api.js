import axios from 'axios';

const { REACT_APP_API_DOMAIN } = process.env;

const api = {
  /**
   * Get all workspace invites.
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   *
   * @return {Promise} Axios res with invites data
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  getWorkspaceInvites(token, cancelToken) {
    return axios({
      method: 'get',
      url: `${REACT_APP_API_DOMAIN}/invites`,
      cancelToken,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  /**
   * Create a workspace invite.
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {Object} data
   *
   * @param {String} data.email
   * @param {String} data.inviterFullName
   *
   * @return {Promise} Axios res with created invite
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  createWorkspaceInvite(token, cancelToken, data) {
    return axios({
      method: 'post',
      url: `${REACT_APP_API_DOMAIN}/invites`,
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
