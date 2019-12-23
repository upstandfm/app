import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './Button';

const Back = styled(Button)`
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: transparent;
  color: var(--color-grey);
  vertical-align: middle;

  :hover {
    background-color: var(--color-lighter-grey);
  }
`;

function BackButton(props) {
  return (
    <Back round {...props}>
      <FontAwesomeIcon icon="arrow-left" size="lg" />
    </Back>
  );
}

export default BackButton;
