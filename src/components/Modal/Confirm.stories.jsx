import React from 'react';

import Button from '../Button';
import Confirm from './Confirm';

export default {
  title: 'components/Modal/Confirm',
  component: Confirm,
  parameters: {
    componentSubtitle: 'For confirming a user action'
  }
};

export const DefaultConfirm = () => {
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <Button onClick={() => setShowConfirm(true)}>Trigger</Button>

      <Confirm
        show={showConfirm}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        title="Are you sure?"
        message={
          <>
            Leaving this page will result in <b>leaving</b>.
          </>
        }
      />
    </>
  );
};

DefaultConfirm.story = {
  name: 'default'
};
