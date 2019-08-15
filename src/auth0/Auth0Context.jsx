import React from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

const {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_REDIRECT_URI,
  REACT_APP_AUTH0_LOGOUT_URL,
  REACT_APP_AUTH0_AUDIENCE,
  REACT_APP_AUTH0_SCOPE
} = process.env;

const Auth0Context = React.createContext();

function Auth0Provider(props) {
  const [client, setClient] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [authErr, setAuthErr] = React.useState();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  /**
   * Removes "?code=abc&state=xyz" from the URL after a login redirect.
   *
   * @param {Object} appState - Contains the target URL to navigate to
   *
   * @see: https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_replaceState()_method
   */
  const _clearCallbackUrlParams = (appState = {}) => {
    const state = {};
    const title = document.title;
    const url = appState.targetUrl || window.location.pathname;

    // This is a temporary workaround for Firefox where "replaceState" does
    // not work as intended. For more info see:
    // https://github.com/auth0/auth0-spa-js/blob/master/FAQ.md#why-do-i-get-error-invalid-state-in-firefox-when-refreshing-the-page-immediately-after-a-login
    window.location.hash = window.location.hash; // eslint-disable-line no-self-assign

    window.history.replaceState(state, title, url);
  };

  /**
   * Log the user in by redirect.
   *
   * @public
   *
   * @return {Promise} Void
   *
   * @see: https://auth0.github.io/auth0-spa-js/classes/auth0client.html#loginwithredirect
   */
  const login = () => {
    return client.loginWithRedirect();
  };

  /**
   * Log the user out.
   *
   * @public
   *
   * @see: https://auth0.github.io/auth0-spa-js/classes/auth0client.html#logout
   */
  const logout = () => {
    // Because "client_id" is included, the "returnTo" URL must be listed in
    // the Application's "Allowed Logout URLs" in the Auth0 dashboard
    client.logout({
      client_id: REACT_APP_AUTH0_CLIENT_ID,
      returnTo: REACT_APP_AUTH0_LOGOUT_URL
    });
  };

  /**
   * Get the user data.
   *
   * @public
   *
   * @return {Promise} User data
   *
   * @see: https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
   */
  const getUser = () => {
    return client.getUser();
  };

  /**
   * Get an access token.
   *
   * @public
   *
   * @return {Promise} Access token
   *
   * @see: https://auth0.github.io/auth0-spa-js/classes/auth0client.html#gettokensilently
   */
  const getToken = () => {
    return client.getTokenSilently();
  };

  React.useEffect(() => {
    (async function initAuth0() {
      try {
        // The Auth0 Single Page Application (SPA) SDK is a new JavaScript
        // library designed to secure SPAs with best practices and less code.
        // See: https://auth0.github.io/auth0-spa-js/classes/auth0client.html
        const auth0 = await createAuth0Client({
          domain: REACT_APP_AUTH0_DOMAIN,
          client_id: REACT_APP_AUTH0_CLIENT_ID,
          redirect_uri: REACT_APP_AUTH0_REDIRECT_URI,
          audience: REACT_APP_AUTH0_AUDIENCE,
          scope: REACT_APP_AUTH0_SCOPE
        });
        setClient(auth0);

        // The callback URL contains two params: "?code=abc&state=xyz"
        // where a missing "state" should trigger an error from
        // "auth0.handleRedirectCallback"
        const hasCode = window.location.search.includes('code=');
        if (hasCode) {
          // Because the Authorization Code flow with Proof Key for Code
          // Exchange (PKCE) is used, a login with redirect MUST call the
          // "auth0.handleRedirectCallback". It handles success and error
          // responses from Auth0--where it verifies the transaction state,
          // exchanges the code for a token and creates a session (cookie).
          // See: https://auth0.github.io/auth0-spa-js/classes/auth0client.html#handleredirectcallback
          const { appState } = await auth0.handleRedirectCallback();
          _clearCallbackUrlParams(appState);
        }

        // See: https://auth0.github.io/auth0-spa-js/classes/auth0client.html#isauthenticated
        const isAuthenticated = await auth0.isAuthenticated();
        setIsAuthenticated(isAuthenticated);
      } catch (err) {
        console.error(err);
        setAuthErr(err.toString());
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const authApi = {
    isLoading,
    authErr,
    isAuthenticated,
    login,
    logout,
    getUser,
    getToken
  };

  return <Auth0Context.Provider value={authApi} {...props} />;
}

function useAuth0() {
  const ctx = React.useContext(Auth0Context);
  if (!ctx) {
    throw new Error('useAuth0() hook must be used inside <Auth0Context/>');
  }
  return ctx;
}

export { Auth0Provider, useAuth0 };
