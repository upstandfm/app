import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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
  name,
  setName,
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
    setName(e.target.value);
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
                value={name}
                onChange={handleInput}
                maxLength={70}
              />
            </Label>

            <Description>Max. 70 characters</Description>
          </Section>

          <Button onClick={handleCreate} disabled={!name || isCreating}>
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
  name: PropTypes.string,
  setName: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired
};

function NewStandup() {
  const history = useHistory();
  const [, standupsDispatch] = useStandups();
  const [
    createStandup,
    abortCreateStandup,
    isCreating,
    err
  ] = useCreateStandup();
  const [, snackbarDispatch] = useSnackbar();

  const [showConfirm, setShowConfirm] = React.useState(false);
  const [name, setName] = React.useState('');

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
    history.push('/');
  };

  const onExit = () => {
    const hasProgress = Boolean(name);
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

    const { id } = await createStandup({ name });
    if (id) {
      standupsDispatch({
        type: 'CREATED_STANDUP',
        data: {
          id,
          name
        }
      });

      history.push(`/standups/${id}`);
    }
  };

  return ReactDOM.createPortal(
    <>
      <FocusTrap>
        <Aside>
          <PureNewStandup
            onExit={onExit}
            name={name}
            setName={setName}
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
