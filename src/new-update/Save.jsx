import React from 'react';
import PropTypes from 'prop-types';

import Button from '../components/Button';

import { Subtitle, Actions } from './Layout';

function Save({ handlePreviousStep, handleSave, isSaving }) {
  return (
    <div>
      <Subtitle>Ready to save and publish your update?</Subtitle>

      <Actions>
        <Button tertiary onClick={handlePreviousStep} disabled={isSaving}>
          Previous
        </Button>

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
