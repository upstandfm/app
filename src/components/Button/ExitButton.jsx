import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import Button from './Button';

const CustomButton = styled(Button)`
  color: var(--color-grey);
`;

function ExitButton(props) {
  return (
    <CustomButton tertiary {...props}>
      <FontAwesomeIcon icon="times" size="lg" />
    </CustomButton>
  );
}

export default ExitButton;
