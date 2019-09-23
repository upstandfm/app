import axios from 'axios';

const { REACT_APP_API_DOMAIN } = process.env;

const api = {
  /**
   * Get all standups
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {Number} limit - Amount of items to fetch
   * @param {String} cursor - Cursor to fetch the "next page"
   *
   * @return {Promise} Axios res: https://github.com/axios/axios#response-schema
   */
  getStandups(token, cancelToken, limit, cursor) {
    let params = {};

    if (limit) {
      params.limit = limit;
    }

    if (cursor) {
      params.cursor = cursor;
    }

    return axios({
      method: 'get',
      url: `${REACT_APP_API_DOMAIN}/standups`,
      cancelToken,
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default api;
