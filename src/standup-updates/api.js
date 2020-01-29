import axios from 'axios';

const { REACT_APP_API_DOMAIN } = process.env;

const api = {
  /**
   * Get all workspace members.
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {String} workspaceId
   *
   * @return {Promise} Axios res with members list
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  getWorkspaceMembers(token, cancelToken, workspaceId) {
    return axios({
      method: 'get',
      url: `${REACT_APP_API_DOMAIN}/workspaces/${workspaceId}/members`,
      cancelToken,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  /**
   * Get all standup updates for a date.
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {String} standupId
   * @param {String} dateKey - Date key of format "YYYY-MM-DD"
   *
   * @return {Promise} Axios res with updates list
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  getStandupUpdates(token, cancelToken, standupId, dateKey) {
    return axios({
      method: 'get',
      url: `${REACT_APP_API_DOMAIN}/standups/${standupId}/updates`,
      cancelToken,
      params: {
        date: dateKey
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default api;
