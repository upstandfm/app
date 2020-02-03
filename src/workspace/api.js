import axios from 'axios';

const { REACT_APP_API_DOMAIN } = process.env;

const api = {
  /**
   * Get a workspace.
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {String} workspaceId
   *
   * @return {Promise} Axios res with workspace data
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  getWorkspace(token, cancelToken, workspaceId) {
    return axios({
      method: 'get',
      url: `${REACT_APP_API_DOMAIN}/workspaces/${workspaceId}`,
      cancelToken,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default api;
