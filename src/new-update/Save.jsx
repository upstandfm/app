import React from 'react';

import Button from '../components/Button';

import { Subtitle, Actions } from './Layout';

function Save({ handlePreviousStep }) {
  return (
    <div>
      <Subtitle>Ready to save and publish your update?</Subtitle>

      <Actions>
        <Button tertiary onClick={handlePreviousStep}>
          Previous
        </Button>

        <Button secondary>Save</Button>
      </Actions>
    </div>
  );
}

export default Save;
