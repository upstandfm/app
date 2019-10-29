import React from 'react';
import axios from 'axios';

import { useAuth0 } from '../auth0';

import api from './api';

/**
 * Custom hook to fetch standup members.
 *
 * @param {Function} dispatch - Reducer dispatch function
 *
 * @return {Array}
 */
function useFetchStandupMembers(dispatch) {
  const { getToken } = useAuth0();

  const [isFetching, setIsFetching] = React.useState(true);
  const [err, setErr] = React.useState(null);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const fetchMembers = async standupId => {
    try {
      setIsFetching(true);
      setErr(null);

      const token = await getToken();
      const res = await api.getStandupMembers(token, source.token, standupId);

      setIsFetching(false);

      dispatch({
        type: 'FETCHED_STANDUP_MEMBERS',
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

  return [fetchMembers, source.cancel, isFetching, err];
}

export default useFetchStandupMembers;
