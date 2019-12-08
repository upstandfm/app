import React from 'react';

import { useAuth0 } from '../auth0';

import SplashScreen from './SplashScreen';
import LoginFailed from './LoginFailed';

const AuthenticatedApp = React.lazy(() => import('../authenticated-app'));

function LoadApp() {
  const { isLoading, authErr, isAuthenticated, login } = useAuth0();

  React.useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      login();
    }
  }, [isLoading, isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading || !isAuthenticated) {
    return <SplashScreen />;
  }

  if (authErr) {
    return <LoginFailed errMessage={authErr} handleRetry={login} />;
  }

  return (
    <React.Suspense fallback={<SplashScreen />}>
      <AuthenticatedApp />
    </React.Suspense>
  );
}

export default LoadApp;
