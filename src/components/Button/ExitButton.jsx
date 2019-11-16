import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './Button';

const Exit = styled(Button)`
  color: var(--color-grey);
`;

function ExitButton(props) {
  return (
    <Exit tertiary {...props}>
      <FontAwesomeIcon icon="times" size="lg" />
    </Exit>
  );
}

export default ExitButton;
