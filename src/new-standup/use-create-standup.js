import React from 'react';
import axios from 'axios';

import { useAuth0 } from '../auth0';

import api from './api';

function useCreateStandup() {
  const { getToken } = useAuth0();

  const [isCreating, setIsCreating] = React.useState(false);
  const [err, setErr] = React.useState(null);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const createStandup = async standupData => {
    try {
      setIsCreating(true);
      setErr(null);

      const token = await getToken();
      const res = await api.createStandup(token, source.token, standupData);

      setIsCreating(false);

      return res.data;
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }

      const { response = {} } = err;
      const { data } = response;
      setErr(data ? data : err);
      setIsCreating(false);
    }
  };

  return [createStandup, source.cancel, isCreating, err];
}

export default useCreateStandup;
