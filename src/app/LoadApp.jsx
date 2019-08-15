import React from 'react';

import { useAuth0 } from '../auth0';

import SplashScreen from './SplashScreen';
import LoginFailed from './LoginFailed';

const AuthenticatedApp = React.lazy(() => import('../authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('../unauthenticated-app'));

function LoadApp() {
  const { isLoading, authErr, isAuthenticated, login } = useAuth0();

  const handleLogin = async () => {
    await login();
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (authErr) {
    return <LoginFailed errMessage={authErr} handleRetry={handleLogin} />;
  }

  return (
    <React.Suspense fallback={<SplashScreen />}>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default LoadApp;
