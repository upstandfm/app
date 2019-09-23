import React from 'react';
import axios from 'axios';

import { useAuth0 } from '../auth0';

import api from './api';

/**
 * Custom hook to fetch standups.
 *
 * @param {Function} dispatch - Reducer dispatch function
 *
 * @return {Array}
 */
function useFetchFiles(dispatch) {
  const { getToken } = useAuth0();

  const [isFetching, setIsFetching] = React.useState(true);
  const [err, setErr] = React.useState(null);
  const [nextPageCursor, setNextPageCursor] = React.useState(null);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const fetchStandups = async (limit, cursor) => {
    try {
      setIsFetching(true);
      setErr(null);

      const token = await getToken();
      const res = await api.getStandups(token, source.token, limit, cursor);

      setIsFetching(false);
      setNextPageCursor(res.data.cursor.next);

      // If we fetch standups with "cursor", it means we are fetching the
      // "next page" of standups, otherwise we fetched the "first page"
      dispatch({
        type: cursor ? 'FETCHED_STANDUPS_NEXT_PAGE' : 'FETCHED_STANDUPS',
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

  return [fetchStandups, source.cancel, isFetching, err, nextPageCursor];
}

export default useFetchFiles;
