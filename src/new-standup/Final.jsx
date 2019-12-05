import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSnackbar } from '../components/Snackbar';
import { Form, Section, InlineLabel, Input } from '../components/Form';
import Button from '../components/Button';

import { SizedContainer, Subtitle, Actions } from './Layout';

import useCreateStandup from './use-create-standup';

const ButtonSpaceRight = styled(Button)`
  margin: 0 1.5em 0 0;
`;

export function PureFinal({
  standupName,
  handlePrevious,
  handleCreate,
  isCreating
}) {
  return (
    <Form>
      <Subtitle>Looks good?</Subtitle>

      <SizedContainer>
        <Section>
          <InlineLabel htmlFor="name">
            NAME
            <Input
              disabled
              type="text"
              id="name"
              value={standupName}
              maxLength={70}
            />
          </InlineLabel>
        </Section>
      </SizedContainer>

      <Actions>
        <ButtonSpaceRight
          tertiary
          onClick={handlePrevious}
          disabled={isCreating}
        >
          Previous
        </ButtonSpaceRight>

        <Button onClick={handleCreate} disabled={isCreating}>
          {isCreating ? (
            <>
              <FontAwesomeIcon icon="circle-notch" size="sm" spin /> Creating..
            </>
          ) : (
            'Yes, create'
          )}
        </Button>
      </Actions>
    </Form>
  );
}

PureFinal.propTypes = {
  standupName: PropTypes.string.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired
};

function Final({ standupName, handlePreviousStep }) {
  const [
    createStandup,
    abortCreateStandup,
    isCreating,
    err
  ] = useCreateStandup();

  const [, snackbarDispatch] = useSnackbar();

  React.useEffect(() => {
    return () => {
      abortCreateStandup();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!err) {
      return;
    }

    let text;
    if (err.details) {
      text = Array.isArray(err.details)
        ? `${err.message}: ${err.details.join(', ')}.`
        : err.details + '.';
    } else {
      text = err.message + '.';
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to create standup',
        text
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePrevious = e => {
    e.preventDefault();
    handlePreviousStep();
  };

  const handleCreate = async e => {
    e.preventDefault();

    const data = {
      standupName
    };
    const res = await createStandup(data);
    if (res && res.standupId) {
      navigate(`/${res.standupId}`);
    }
  };

  return (
    <PureFinal
      standupName={standupName}
      handlePrevious={handlePrevious}
      handleCreate={handleCreate}
      isCreating={isCreating}
    />
  );
}

Final.propTypes = {
  standupName: PropTypes.string.isRequired,
  handlePreviousStep: PropTypes.func.isRequired
};

export default Final;
