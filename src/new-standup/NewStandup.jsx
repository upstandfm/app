import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FocusTrap from 'focus-trap-react';
import styled from 'styled-components';

import { ExitButton } from '../components/Button';
import { Confirm } from '../components/Modal';
import { Form, Section, Label, Input } from '../components/Form';
import { useSnackbar } from '../components/Snackbar';
import Button from '../components/Button';

import { useStandups } from '../standups';

import useCreateStandup from './use-create-standup';

import { Container, Wrapper, ExitContainer, Title } from './Layout';

const CustomSection = styled(Section)`
  margin: 0 0 2em 0;
`;

const CustomInput = styled(Input)`
  font-size: 2.6em;
  border: none;
  padding: 0.5em 0;
  font-weight: bold;

  :focus {
    box-shadow: none;
  }

  @media (max-width: 1130px) {
    font-size: 2em;
  }

  @media (max-width: 780px) {
    font-size: 1.6em;
  }

  @media (max-width: 480px) {
    font-size: 1.2em;
  }
`;

function PureNewStandup({
  standupName,
  setStandupName,
  handleCreate,
  isCreating
}) {
  const nameInput = React.createRef();

  React.useEffect(() => {
    nameInput.current.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInput = e => {
    setStandupName(e.target.value);
  };

  return (
    <Form>
      <Title>Create a new standup</Title>

      <CustomSection>
        <Label htmlFor="name">
          <CustomInput
            type="text"
            id="name"
            placeholder="What name describes your team best?"
            ref={nameInput}
            value={standupName}
            onChange={handleInput}
            maxLength={70}
          />
        </Label>
      </CustomSection>

      <Button
        onClick={handleCreate}
        disabled={standupName.length === 0 || isCreating}
      >
        {isCreating ? (
          <>
            <FontAwesomeIcon icon="circle-notch" size="sm" spin /> Creating..
          </>
        ) : (
          'Create'
        )}
      </Button>
    </Form>
  );
}

PureNewStandup.propTypes = {
  standupName: PropTypes.string,
  setStandupName: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired
};

function NewStandup() {
  const [, standupsDispatch] = useStandups();
  const [
    createStandup,
    abortCreateStandup,
    isCreating,
    err
  ] = useCreateStandup();

  const [, snackbarDispatch] = useSnackbar();

  const [showConfirm, setShowConfirm] = React.useState(false);
  const [standupName, setStandupName] = React.useState('');

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

  const navigateHome = () => {
    navigate('/');
  };

  const handleExit = () => {
    const hasProgress = Boolean(standupName);
    if (hasProgress) {
      setShowConfirm(true);
      return;
    }

    navigateHome();
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleCreate = async e => {
    e.preventDefault();

    const data = {
      standupName
    };

    const { standupId } = await createStandup(data);
    if (standupId) {
      standupsDispatch({
        type: 'CREATED_STANDUP',
        data: {
          standupId,
          standupName
        }
      });

      navigate(`/standups/${standupId}`);
    }
  };

  return ReactDOM.createPortal(
    <>
      <FocusTrap>
        <Container>
          <ExitContainer>
            <ExitButton aria-label="exit" title="exit" onClick={handleExit} />
          </ExitContainer>

          <Wrapper>
            <PureNewStandup
              standupName={standupName}
              setStandupName={setStandupName}
              handleCreate={handleCreate}
              isCreating={isCreating}
            />
          </Wrapper>
        </Container>
      </FocusTrap>

      <Confirm
        show={showConfirm}
        handleCancel={handleCancel}
        handleConfirm={navigateHome}
        title="Are you sure you want to exit?"
        message={
          <>
            Your progress will be <b>lost</b> if you exit now.
          </>
        }
      />
    </>,
    document.body
  );
}

export default NewStandup;
