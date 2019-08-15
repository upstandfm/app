import React from 'react';

import { useAuth0, useUser } from '../auth0';

function AuthenticatedApp() {
  const { logout } = useAuth0();
  const { fullName } = useUser();

  return (
    <div>
      <header>
        <span>upstand.fm</span>
      </header>

      <main>
        <p>Welcome {fullName}.</p>

        <button onClick={logout}>logout</button>
      </main>

      <footer>
        <span>&copy; {new Date().getFullYear()} upstand.fm</span>
      </footer>
    </div>
  );
}

export default AuthenticatedApp;
