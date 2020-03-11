import React from 'react';
import axios from 'axios';

import { useAuth0 } from '../auth0';

import api from './api';

/**
 * Custom hook to fetch channel recordings.
 *
 * @param {String} channelId
 * @param {Function} dispatch - Reducer dispatch function
 *
 * @return {Array}
 */
function useFetchRecordings(channelId, dispatch) {
  const { getToken } = useAuth0();

  const [isFetching, setIsFetching] = React.useState(true);
  const [err, setErr] = React.useState(null);
  const [nextPageCursor, setNextPageCursor] = React.useState(null);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const fetchRecordings = async (limit, cursor) => {
    try {
      setIsFetching(true);
      setErr(null);

      const token = await getToken();
      const res = await api.getChannelRecordings(
        token,
        source.token,
        channelId,
        limit,
        cursor
      );

      // If we fetch recordings with "cursor", it means we are fetching the
      // "next page" of recordings, otherwise we fetched the "first page"
      dispatch({
        type: cursor ? 'FETCHED_RECORDINGS_NEXT_PAGE' : 'FETCHED_RECORDINGS',
        data: res.data.items
      });

      setNextPageCursor(res.data.cursor.next);
      setIsFetching(false);
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

  return [fetchRecordings, source.cancel, isFetching, err, nextPageCursor];
}

export default useFetchRecordings;
