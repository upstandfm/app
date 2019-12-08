import React from 'react';

import { Auth0Provider, UserProvider } from '../auth0';
import { SnackbarProvider } from '../components/Snackbar';
import { StandupsProvider } from '../standups';

function Providers({ children }) {
  return (
    <Auth0Provider>
      <UserProvider>
        <SnackbarProvider>
          <StandupsProvider>{children}</StandupsProvider>
        </SnackbarProvider>
      </UserProvider>
    </Auth0Provider>
  );
}

export default Providers;
