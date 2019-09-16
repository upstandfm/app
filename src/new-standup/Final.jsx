import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  ListContainer,
  ListTitle,
  List,
  ListEmpty,
  ListItem,
  ListItemText
} from '../components/List/List';

import { Form } from '../components/Form';
import Button from '../components/Button';

import { Subtitle, Actions } from './Layout';

const ButtonSpaceRight = styled(Button)`
  margin: 0 1.5em 0 0;
`;

function Final({ standupUsers, handlePreviousStep }) {
  const handlePrevious = e => {
    e.preventDefault();
    handlePreviousStep();
  };

  const handleCreate = e => {
    e.preventDefault();
    console.log('create');
    // TODO: create standup
  };

  return (
    <Form>
      <Subtitle>Looks good?</Subtitle>

      <ListContainer>
        <ListTitle>Users to invite ({standupUsers.length})</ListTitle>

        <List>
          {standupUsers.length === 0 && <ListEmpty>No users yet.</ListEmpty>}

          {standupUsers.map(userEmail => {
            return (
              <ListItem key={userEmail} title={userEmail}>
                <FontAwesomeIcon icon="user" size="sm" />

                <ListItemText>{userEmail}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </ListContainer>

      <Actions>
        <ButtonSpaceRight tertiary onClick={handlePrevious}>
          Previous
        </ButtonSpaceRight>

        <Button onClick={handleCreate}>Yes, create</Button>
      </Actions>
    </Form>
  );
}

Final.propTypes = {
  standupUsers: PropTypes.arrayOf(PropTypes.string),
  handlePreviousStep: PropTypes.func.isRequired
};

export default Final;
