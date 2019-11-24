import React from 'react';

import { Auth0Provider, UserProvider } from '../auth0';
import { SnackbarProvider } from '../components/Snackbar';

function Providers({ children }) {
  return (
    <Auth0Provider>
      <UserProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </UserProvider>
    </Auth0Provider>
  );
}

export default Providers;
