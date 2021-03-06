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

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const fetchWorkspace = async workspaceId => {
    try {
      dispatch({
        type: 'FETCHING_WORKSPACE',
        data: {}
      });

      const token = await getToken();
      const res = await api.getWorkspace(token, source.token, workspaceId);

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

      dispatch({
        type: 'FETCH_WORKSPACE_ERROR',
        data: data ? data : err
      });
    }
  };

  return [fetchWorkspace, source.cancel];
}
