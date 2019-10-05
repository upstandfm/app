import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Form, Section, Input, Description } from '../components/Form';
import Button from '../components/Button';
import {
  ListContainer,
  ListEmpty,
  ListTitle,
  List,
  ListItem,
  ListItemText
} from '../components/List';

import { Subtitle, Actions } from './Layout';

const InlineSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  grid-gap: 1em;
  grid-template-areas:
    'input        button'
    'description  description';
  align-items: center;

  @media (max-width: 470px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'input'
      'description'
      'button';
  }
`;

const InlineInput = styled(Input)`
  grid-area: input;
`;

const InlineButton = styled(Button)`
  grid-area: button;

  @media (max-width: 470px) {
    justify-self: center;
    width: 33%;
    margin: 0 0 3em 0;
  }
`;

const InlineDescription = styled(Description)`
  grid-area: description;
  margin: 0;
`;

const Help = styled.span`
  :hover {
    cursor: help;
  }
`;

const ButtonSpaceRight = styled(Button)`
  margin: 0 1.5em 0 0;
`;

const DeleteButton = styled(Button)`
  :hover {
    color: var(--color-red) !important;
  }

  :active {
    color: var(--color-darker-red) !important;
  }
`;

function Invite({
  standupUsers,
  dispatch,
  handlePreviousStep,
  handleNextStep
}) {
  const emailInput = React.createRef();

  const [email, setEmail] = React.useState('');
  const [feedback, setFeedback] = React.useState('');

  React.useEffect(() => {
    emailInput.current.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInput = e => {
    const isValid = emailInput.current.checkValidity();
    if (!isValid) {
      setFeedback('Invalid email.');
    } else {
      setFeedback('');
    }

    setEmail(e.target.value);
  };

  const handleAddUser = e => {
    e.preventDefault();

    const isValid = emailInput.current.checkValidity();
    if (!isValid) {
      return;
    }

    const isDuplicate = standupUsers.includes(email);
    if (isDuplicate) {
      setFeedback('You already added this user.');
      return;
    }

    dispatch({
      type: 'ADD_USER',
      data: email
    });

    setEmail('');
    setFeedback('');
  };

  const handleRemoveUser = e => {
    e.preventDefault();

    dispatch({
      type: 'REMOVE_USER',
      data: e.target.getAttribute('data-email')
    });
  };

  const handlePrevious = e => {
    e.preventDefault();
    handlePreviousStep();
  };

  const handleNext = e => {
    e.preventDefault();
    handleNextStep();
  };

  return (
    <Form>
      <Subtitle>
        Who are your team members?{' '}
        <Help>
          <FontAwesomeIcon
            icon="info-circle"
            size="sm"
            title="you can also skip this step, and invite your team after you create the standup"
          />
        </Help>
      </Subtitle>

      <InlineSection>
        <InlineInput
          aria-label="email"
          type="email"
          id="email"
          placeholder="user@domain.com"
          ref={emailInput}
          value={email}
          onChange={handleInput}
        />

        <InlineButton
          disabled={email.length === 0 || Boolean(feedback)}
          secondary
          onClick={handleAddUser}
        >
          Add
        </InlineButton>

        <InlineDescription error={Boolean(feedback)}>
          {feedback ? feedback : 'Added users will receive an invite by email.'}
        </InlineDescription>
      </InlineSection>

      <ListContainer>
        <ListTitle>Users to invite ({standupUsers.length})</ListTitle>

        <List>
          {standupUsers.length === 0 && <ListEmpty>No users yet.</ListEmpty>}

          {standupUsers.map(userEmail => {
            return (
              <ListItem key={userEmail} title={userEmail}>
                <FontAwesomeIcon icon="user" size="sm" />

                <ListItemText>{userEmail}</ListItemText>

                <DeleteButton
                  tertiary
                  data-email={userEmail}
                  onClick={handleRemoveUser}
                  aria-label="remove user"
                  title="remove user"
                >
                  <FontAwesomeIcon icon="trash" />
                </DeleteButton>
              </ListItem>
            );
          })}
        </List>
      </ListContainer>

      <Actions>
        <ButtonSpaceRight tertiary onClick={handlePrevious}>
          Previous
        </ButtonSpaceRight>

        <Button onClick={handleNext}>
          {standupUsers.length === 0 ? 'Skip for now' : 'Next'}
        </Button>
      </Actions>
    </Form>
  );
}

Invite.propTypes = {
  standupUsers: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
  handlePreviousStep: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired
};

export default Invite;
