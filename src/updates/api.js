import axios from 'axios';

const { REACT_APP_API_DOMAIN } = process.env;

const api = {
  /**
   * Get all standup updates for a date.
   *
   * @param {String} token - Access token
   * @param {String} cancelToken - Cancellation token to abort the HTTP request
   * @param {String} standupId
   * @param {String} dateKey - Date key of format "(D)D-(M)M-YYYY"
   *
   * @return {Promise} Axios res with updates list
   *
   * For Axios res envelope see: https://github.com/axios/axios#response-schema
   */
  getStandupUpdates(token, cancelToken, standupId, dateKey) {
    let params = {};

    if (dateKey) {
      params.date = dateKey;
    }

    return axios({
      method: 'get',
      url: `${REACT_APP_API_DOMAIN}/standups/${standupId}/updates`,
      cancelToken,
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default api;
