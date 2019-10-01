import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSnackbar } from '../components/Snackbar';

const Container = styled.div`
  margin: 2em 0 1em 0;
  padding: 0.75em;
  background-color: var(--color-lightest-purple);
  border-radius: 8px;
`;

const Title = styled.h3`
  margin: 0;
`;

const List = styled.ol``;

const ListItem = styled.li`
  margin: 0 0 0.5em 0;
`;

const Text = styled.p`
  margin: 0.5em 0;
`;

export function MediaError({ err }) {
  const [, snackbarDispatch] = useSnackbar();

  React.useEffect(() => {
    if (!err) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to use microphone',
        text: err.message
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Title>
        <FontAwesomeIcon icon="lightbulb" size="sm" /> We couldn&apos;t access
        your microphone
      </Title>

      <Text>This might be because:</Text>

      <List>
        <ListItem>
          Your browser doesn't support this feature.
          <br />
          <b>Solution:</b> try using the latest version of Firefox or Chrome.
        </ListItem>

        <ListItem>
          You didn&apos;t allow us to use your microphone. We need temporary
          access to your microphone, so you can record your update.
          <br />
          <b>Solution:</b> On Firefox, refresh the page and click on "Allow"
          when the browser asks permission to use your microphone.
          <br />
          On Chrome, click on the{' '}
          <FontAwesomeIcon icon="info-circle" size="sm" /> icon in the "URL bar"
          and make sure the microphone's permission is set to "Allow". Then
          refresh the page.
        </ListItem>
      </List>
    </Container>
  );
}

export function RecorderError({ err }) {
  const [, snackbarDispatch] = useSnackbar();

  React.useEffect(() => {
    if (!err) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to record update',
        text: err.message
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Title>
        <FontAwesomeIcon icon="lightbulb" size="sm" /> We couldn&apos;t record
        your update
      </Title>

      <Text>Sorry! Something unexpected happened.</Text>
    </Container>
  );
}