import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/Button';

import { Subtitle, Actions } from './Layout';

const ButtonSpaceRight = styled(Button)`
  margin: 0 1.5em 0 0;
`;

function Save({ handlePreviousStep, handleSave, isSaving }) {
  return (
    <div>
      <Subtitle>Ready to save and publish your update?</Subtitle>

      <Actions>
        <ButtonSpaceRight
          tertiary
          onClick={handlePreviousStep}
          disabled={isSaving}
        >
          Previous
        </ButtonSpaceRight>

        <Button disabled={isSaving} onClick={handleSave}>
          {isSaving ? 'Saving..' : 'Yes, save and publish'}
        </Button>
      </Actions>
    </div>
  );
}

Save.propTypes = {
  handlePreviousStep: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired
};

export default Save;
