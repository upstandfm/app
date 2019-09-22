import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
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
import CreateError from './CreateError';

import useCreateStandup from './use-create-standup';

const ButtonSpaceRight = styled(Button)`
  margin: 0 1.5em 0 0;
`;

function Final({ standupName, standupUsers, handlePreviousStep }) {
  const [
    createStandup,
    abortCreateStandup,
    isCreating,
    err
  ] = useCreateStandup();

  React.useEffect(() => {
    return () => {
      abortCreateStandup();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

      {err && <CreateError message={err.message} details={err.details} />}
    </Form>
  );
}

Final.propTypes = {
  standupName: PropTypes.string.isRequired,
  standupUsers: PropTypes.arrayOf(PropTypes.string),
  handlePreviousStep: PropTypes.func.isRequired
};

export default Final;
