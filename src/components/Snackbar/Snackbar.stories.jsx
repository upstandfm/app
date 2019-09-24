import React from 'react';

import Button from '../Button';

import { SnackbarProvider, useSnackbar } from './SnackbarContext';
import Snackbar from './Snackbar';

export default {
  title: 'components|Snackbar',
  parameters: {
    componentSubtitle: 'Snackbar to display notification messages'
  }
};

function App() {
  const [, snackbarDispatch] = useSnackbar();

  const [count, setCount] = React.useState(1);

  const handleShowMessage = () => {
    setCount(c => c + 1);

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: `Message number ${count}`
    });
  };

  return <Button onClick={handleShowMessage}>Show message</Button>;
}

export const DefaultSnackbar = () => {
  return (
    <SnackbarProvider>
      <App />

      <Snackbar />
    </SnackbarProvider>
  );
};

DefaultSnackbar.story = {
  name: 'default'
};
