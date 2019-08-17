import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import { Auth0Provider, UserProvider } from '../auth0';

function Providers({ theme, children }) {
  return (
    <Auth0Provider>
      <UserProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </UserProvider>
    </Auth0Provider>
  );
}

Providers.propTypes = {
  theme: PropTypes.object.isRequired
};

export default Providers;
