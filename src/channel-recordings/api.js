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
   * Get all channel recordings.
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {String} channelId
   * @param {Number} limit - Amount of items to fetch
   * @param {String} cursor - Cursor to fetch the "next page"
   *
   * @return {Promise} Axios res with recording list
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  getChannelRecordings(token, cancelToken, channelId, limit, cursor) {
    let params = {};

    if (limit) {
      params.limit = limit;
    }

    if (cursor) {
      params.cursor = cursor;
    }

    return axios({
      method: 'get',
      url: `${REACT_APP_API_DOMAIN}/channels/${channelId}/recordings`,
      cancelToken,
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default api;
