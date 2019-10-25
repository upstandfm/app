import React from 'react';

import Providers from './Providers';
import LoadApp from './LoadApp';

function App(props) {
  return (
    <React.StrictMode>
      <Providers {...props}>
        <LoadApp />
      </Providers>
    </React.StrictMode>
  );
}

export default App;
