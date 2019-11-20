import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './Button';

const Exit = styled(Button)`
  width: 40px;
  height: 40px;
  background-color: transparent;
  color: var(--color-grey);

  :hover {
    background-color: var(--color-lighter-grey);
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
