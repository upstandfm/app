import React from 'react';
import axios from 'axios';

import { useAuth0 } from '../auth0';

import api from './api';

/**
 * Custom hook to create a workspace invite.
 *
 * @param {Function} dispatch - Reducer dispatch function
 *
 * @return {Array}
 */
function useCreateInvite(dispatch) {
  const { getToken } = useAuth0();

  const [isCreating, setIsCreating] = React.useState(false);
  const [err, setErr] = React.useState(null);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const createInvite = async data => {
    try {
      setIsCreating(true);
      setErr(null);

      const token = await getToken();
      const res = await api.createWorkspaceInvite(token, source.token, data);

      setIsCreating(false);

      dispatch({
        type: 'CREATED_INVITE',
        data: res.data
      });
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }

      const { response = {} } = err;
      const { data } = response;
      setErr(data ? data : err);
      setIsCreating(false);

      throw err;
    }
  };

  return [createInvite, source.cancel, isCreating, err];
}

export default useCreateInvite;
