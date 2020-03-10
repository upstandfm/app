import React from 'react';

import { Auth0Provider, UserProvider } from '../auth0';
import { SnackbarProvider } from '../components/Snackbar';
import { WorkspaceProvider } from '../workspace';
import { ChannelsProvider } from '../channels';
import { AudioPlayerProvider } from '../components/AudioPlayer';

function Providers({ children }) {
  return (
    <Auth0Provider>
      <UserProvider>
        <SnackbarProvider>
          <WorkspaceProvider>
            <ChannelsProvider>
              <AudioPlayerProvider>{children}</AudioPlayerProvider>
            </ChannelsProvider>
          </WorkspaceProvider>
        </SnackbarProvider>
      </UserProvider>
    </Auth0Provider>
  );
}

export default Providers;
