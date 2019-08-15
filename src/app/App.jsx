import React from 'react';

import Providers from './Providers';
import LoadApp from './LoadApp';

function App(props) {
  return (
    <Providers {...props}>
      <LoadApp />
    </Providers>
  );
}

export default App;
