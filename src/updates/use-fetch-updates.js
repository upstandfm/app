import React from 'react';
import axios from 'axios';

import { useAuth0 } from '../auth0';

import api from './api';

/**
 * Custom hook to fetch standup updates.
 *
 * @param {Function} dispatch - Reducer dispatch function
 *
 * @return {Array}
 */
function useFetchUpdates(dispatch) {
  const { getToken } = useAuth0();

  const [isFetching, setIsFetching] = React.useState(true);
  const [err, setErr] = React.useState(null);
  const [dayOffset, setDayOffset] = React.useState(0);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const fetchUpdates = async (standupId, dateKey) => {
    try {
      setIsFetching(true);
      setErr(null);

      const token = await getToken();
      const res = await api.getStandupUpdates(
        token,
        source.token,
        standupId,
        dateKey
      );

      setIsFetching(false);
      setDayOffset(s => s + 1);

      dispatch({
        type: 'FETCHED_UPDATES_FOR_DATE',
        data: {
          dateKey: res.data.date,
          items: res.data.items
        }
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

  return [fetchUpdates, source.cancel, isFetching, err, dayOffset];
}

export default useFetchUpdates;
