import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './Button';

const Exit = styled(Button)`
  background-color: transparent;
  box-shadow: none;
  border-color: transparent;
  color: var(--color-grey) !important;

  :hover {
    background-color: var(--color-lighter-grey);
    border-color: transparent;
  }

  :active {
    background-color: var(--color-light-grey);
    border-color: transparent;
  }
`;

function ExitButton(props) {
  return (
    <Exit round {...props}>
      <FontAwesomeIcon icon="times" size="lg" />
    </Exit>
  );
}

export default ExitButton;
