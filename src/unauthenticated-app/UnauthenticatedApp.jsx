import React from 'react';

import { useAuth0 } from '../auth0';

function UnauthenticatedApp() {
  const { login } = useAuth0();

  const handleLogin = async () => {
    await login();
  };

  return (
    <div>
      <main>
        <h1>upstand.fm</h1>

        <p>Asynchronous standups for remote teams.</p>

        <p>
          Work in progress..{' '}
          <span
            role="img"
            aria-label="grinning face with aquinting eyes and sweat drop"
          >
            😅
          </span>
        </p>

        <p>
          Signups are disabled at the moment, if you&apos;d like access, please
          send an email to <a href="mailto:info@upstand.fm">info@upstand.fm</a>
        </p>

        <button onClick={handleLogin}>login</button>

        <footer>
          <span>&copy; {new Date().getFullYear()} upstand.fm</span>
        </footer>
      </main>
    </div>
  );
}

export default UnauthenticatedApp;
