import React from 'react';

import SplashScreen from './SplashScreen';

export default {
  title: 'screens|SplashScreen',
  component: SplashScreen,
  parameters: {
    componentSubtitle: 'App loading screen'
  }
};

export const DefaultAudioPlayer = () => {
  return <SplashScreen />;
};

DefaultAudioPlayer.story = {
  name: 'default'
};
