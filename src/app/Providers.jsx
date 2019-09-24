import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import { Auth0Provider, UserProvider } from '../auth0';
import { SnackbarProvider } from '../components/Snackbar';

function Providers({ theme, children }) {
  return (
    <Auth0Provider>
      <UserProvider>
        <SnackbarProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </SnackbarProvider>
      </UserProvider>
    </Auth0Provider>
  );
}

Providers.propTypes = {
  theme: PropTypes.object.isRequired
};

export default Providers;
