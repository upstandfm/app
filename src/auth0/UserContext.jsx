import React from 'react';

import { useAuth0 } from './Auth0Context';

const UserContext = React.createContext();

function UserProvider(props) {
  const { isAuthenticated, getUser } = useAuth0();
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    (async function getUserData() {
      if (isAuthenticated) {
        const auth0User = await getUser();
        const userData = {
          email: auth0User.email,
          emailIsVerified: auth0User.email_verified,
          username: auth0User.nickname,
          fullName: auth0User.name,
          avatarUrl: auth0User.picture,
          updatedAt: auth0User.updated_at
        };
        setUser(userData);
      }
    })();
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  return <UserContext.Provider value={user} {...props} />;
}

function useUser() {
  const ctx = React.useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser() hook must be used inside <UserContext/>');
  }
  return ctx;
}

export { UserProvider, useUser };
