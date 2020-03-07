import React from 'react';
import axios from 'axios';

import { useAuth0 } from '../auth0';

import api from './api';

/**
 * Custom hook to fetch standup updates.
 *
 * @param {String} standupId
 * @param {Function} dispatch - Reducer dispatch function
 *
 * @return {Array}
 */
function useFetchUpdates(standupId, dispatch) {
  const { getToken } = useAuth0();

  const [isFetching, setIsFetching] = React.useState(true);
  const [err, setErr] = React.useState(null);
  const [nextPageCursor, setNextPageCursor] = React.useState(null);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const fetchUpdates = async (limit, cursor) => {
    try {
      setIsFetching(true);
      setErr(null);

      const token = await getToken();
      const res = await api.getStandupUpdates(
        token,
        source.token,
        standupId,
        limit,
        cursor
      );

      setIsFetching(false);
      setNextPageCursor(res.data.cursor.next);

      // If we fetch updates with "cursor", it means we are fetching the
      // "next page" of updates, otherwise we fetched the "first page"
      dispatch({
        type: cursor ? 'FETCHED_UPDATES_NEXT_PAGE' : 'FETCHED_UPDATES',
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

  return [fetchUpdates, source.cancel, isFetching, err, nextPageCursor];
}

export default useFetchUpdates;
