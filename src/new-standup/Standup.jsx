import React from 'react';
import PropTypes from 'prop-types';

import { Form, Section, Label, Input } from '../components/Form';
import Button from '../components/Button';

import { Subtitle, Actions } from './Layout';

function Standup({ standupName, dispatch, handleNextStep }) {
  const nameInput = React.createRef();

  React.useEffect(() => {
    nameInput.current.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInput = e => {
    dispatch({
      type: 'SET_NAME',
      data: e.target.value
    });
  };

  const handleClickNext = e => {
    e.preventDefault();
    handleNextStep();
  };

  return (
    <Form>
      <Subtitle>What name describes your team best?</Subtitle>

      <Section>
        <Label htmlFor="name">
          <Input
            type="text"
            id="name"
            placeholder="Team ship it 🚀"
            ref={nameInput}
            value={standupName}
            onChange={handleInput}
            maxLength={70}
          />
        </Label>
      </Section>

      <Actions>
        <Button
          tertiary
          disabled={standupName.length === 0}
          onClick={handleClickNext}
        >
          Next
        </Button>
      </Actions>
    </Form>
  );
}

Standup.propTypes = {
  standupName: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired
};

export default Standup;
