import React from 'react';
import axios from 'axios';

import { useAuth0 } from '../auth0';

import api from './api';

/**
 * Custom hook to fetch channels.
 *
 * @param {Function} dispatch - Reducer dispatch function
 *
 * @return {Array}
 */
function useFetchChannels(dispatch) {
  const { getToken } = useAuth0();

  const [isFetching, setIsFetching] = React.useState(true);
  const [err, setErr] = React.useState(null);
  const [nextPageCursor, setNextPageCursor] = React.useState(null);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const fetchChannels = async (limit, cursor) => {
    try {
      setIsFetching(true);
      setErr(null);

      const token = await getToken();
      const res = await api.getChannels(token, source.token, limit, cursor);

      setIsFetching(false);
      setNextPageCursor(res.data.cursor.next);

      // If we fetch channels with "cursor", it means we are fetching the
      // "next page" of channels, otherwise we fetched the "first page"
      dispatch({
        type: cursor ? 'FETCHED_CHANNELS_NEXT_PAGE' : 'FETCHED_CHANNELS',
        data: res.data.items
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

  return [fetchChannels, source.cancel, isFetching, err, nextPageCursor];
}

export default useFetchChannels;
