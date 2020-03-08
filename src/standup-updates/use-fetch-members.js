import React from 'react';
import axios from 'axios';

import { useUser, useAuth0 } from '../auth0';

import api from './api';

/**
 * Custom hook to fetch workspace members.
 *
 * @param {Function} dispatch - Reducer dispatch function
 *
 * @return {Array}
 */
function useFetchMembers(dispatch) {
  const { workspaceId } = useUser();
  const { getToken } = useAuth0();

  const [isFetching, setIsFetching] = React.useState(true);
  const [err, setErr] = React.useState(null);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const fetchMembers = async () => {
    try {
      setIsFetching(true);
      setErr(null);

      const token = await getToken();
      const res = await api.getWorkspaceMembers(
        token,
        source.token,
        workspaceId
      );

      dispatch({
        type: 'FETCHED_MEMBERS',
        data: res.data.items
      });

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

  return [fetchMembers, source.cancel, isFetching, err];
}

export default useFetchMembers;
