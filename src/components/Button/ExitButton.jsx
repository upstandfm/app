import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './Button';

function ExitButton(props) {
  return (
    <Button tertiary {...props}>
      <FontAwesomeIcon icon="times" size="lg" />
    </Button>
  );
}

export default ExitButton;
