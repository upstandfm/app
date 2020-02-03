import React from 'react';
import axios from 'axios';

import { useAuth0 } from '../auth0';

import api from './api';

/**
 * Custom hook to fetch a workspace.
 *
 * @param {Function} dispatch - Reducer dispatch function
 *
 * @return {Array}
 */
export default function useFetchWorkspace(dispatch) {
  const { getToken } = useAuth0();

  const [isFetching, setIsFetching] = React.useState(true);
  const [err, setErr] = React.useState(null);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const fetchWorkspace = async workspaceId => {
    try {
      setIsFetching(true);
      setErr(null);

      const token = await getToken();
      const res = await api.getWorkspace(token, source.token, workspaceId);

      setIsFetching(false);

      dispatch({
        type: 'FETCHED_WORKSPACE',
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

  return [fetchWorkspace, source.cancel, isFetching, err];
}
