import React from 'react';

import { Auth0Provider, UserProvider } from '../auth0';
import { SnackbarProvider } from '../components/Snackbar';
import { StandupsProvider } from '../standups';
import { AudioPlayerProvider } from '../components/AudioPlayer';

function Providers({ children }) {
  return (
    <Auth0Provider>
      <UserProvider>
        <SnackbarProvider>
          <StandupsProvider>
            <AudioPlayerProvider>{children}</AudioPlayerProvider>
          </StandupsProvider>
        </SnackbarProvider>
      </UserProvider>
    </Auth0Provider>
  );
}

export default Providers;
