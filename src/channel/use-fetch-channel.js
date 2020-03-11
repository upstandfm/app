import React from 'react';
import axios from 'axios';

import { useAuth0 } from '../auth0';

import api from './api';

/**
 * Custom hook to fetch a single channel.
 *
 * @param {Function} dispatch - Reducer dispatch function
 *
 * @return {Array}
 */
function useFetchChannel(dispatch) {
  const { getToken } = useAuth0();

  const [isFetching, setIsFetching] = React.useState(true);
  const [err, setErr] = React.useState(null);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const fetchChannel = async standupId => {
    try {
      setIsFetching(true);
      setErr(null);

      const token = await getToken();
      const res = await api.getChannel(token, source.token, standupId);

      setIsFetching(false);

      dispatch({
        type: 'FETCHED_CHANNEL',
        data: res.data
      });
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }

      const { response = {} } = err;
      const { data } = response;
      setErr(data ? data : err);
      setIsFetching(false);
    }
  };

  return [fetchChannel, source.cancel, isFetching, err];
}

export default useFetchChannel;
