import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FocusTrap from 'focus-trap-react';

import { ExitButton } from '../components/Button';
import { Confirm } from '../components/Modal';
import { Form, Section, Label, Input, Description } from '../components/Form';
import { useSnackbar } from '../components/Snackbar';
import Button from '../components/Button';

import { useStandups } from '../standups';

import useCreateStandup from './use-create-standup';

import { Aside, Wrapper, ExitContainer, Title } from './Layout';

export function PureNewStandup({
  onExit,
  standupName,
  setStandupName,
  handleCreate,
  isCreating
}) {
  const nameInput = React.createRef();

  React.useEffect(() => {
    nameInput.current.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleExit = () => {
    onExit();
  };

  const handleInput = e => {
    setStandupName(e.target.value);
  };

  return (
    <>
      <ExitContainer>
        <ExitButton aria-label="exit" title="exit" onClick={handleExit} />
      </ExitContainer>

      <Wrapper>
        <Form>
          <Title>Create a new standup</Title>

          <Section>
            <Label htmlFor="name">
              NAME
              <Input
                type="text"
                id="name"
                placeholder="What will be shared?"
                ref={nameInput}
                value={standupName}
                onChange={handleInput}
                maxLength={70}
              />
            </Label>

            <Description>Max. 70 characters</Description>
          </Section>

          <Button
            onClick={handleCreate}
            disabled={standupName.length === 0 || isCreating}
          >
            {isCreating ? (
              <>
                <FontAwesomeIcon icon="circle-notch" size="sm" spin />{' '}
                Creating..
              </>
            ) : (
              'Create'
            )}
          </Button>
        </Form>
      </Wrapper>
    </>
  );
}

PureNewStandup.propTypes = {
  onExit: PropTypes.func.isRequired,
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

  const onExit = () => {
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
        <Aside>
          <PureNewStandup
            onExit={onExit}
            standupName={standupName}
            setStandupName={setStandupName}
            handleCreate={handleCreate}
            isCreating={isCreating}
          />
        </Aside>
      </FocusTrap>

      <Confirm
        show={showConfirm}
        handleCancel={handleCancel}
        handleConfirm={navigateHome}
        title="Are you sure?"
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
