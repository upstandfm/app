import React from 'react';

import { Auth0Provider, UserProvider } from '../auth0';

function Providers({ children }) {
  return (
    <Auth0Provider>
      <UserProvider>{children}</UserProvider>
    </Auth0Provider>
  );
}

export default Providers;
