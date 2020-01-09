import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSnackbar } from '../components/Snackbar';

const Container = styled.div`
  padding: 1em 2em;
  background-color: var(--color-white);
  box-shadow: 0px 2px 4px rgba(25, 18, 56, 0.18);
  border-radius: var(--radius-size);
`;

const Title = styled.h3`
  margin: 1em 0;
  font-weight: normal;
`;

const List = styled.ol`
  max-width: 35rem;
`;

const ListItem = styled.li`
  margin: 0 0 0.5em 0;
`;

const Text = styled.p`
  margin: 0.5em 0;
`;

export function UserMediaError({ err }) {
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
      <Title>We couldn&apos;t access your microphone.</Title>

      <Text>This might be because:</Text>

      <List>
        <ListItem>
          Your browser doesn't support this feature.
          <br />
          <b>Solution:</b> try using the latest version of Firefox or Chrome.
        </ListItem>

        <ListItem>
          You didn&apos;t allow us to use your microphone.
          <br />
          We need temporary access to your microphone, so you can record your
          update.
          <br />
          <b>Solution:</b>
          <List as={'ul'}>
            <ListItem>
              On Firefox, refresh the page and click on "Allow" when the browser
              asks permission to use your microphone.
              <br />
              If you told Firefox to "Remember this decision" before you
              disallowed access, first click on the{' '}
              <FontAwesomeIcon icon="info-circle" size="sm" /> icon in the "URL
              bar" and clear the permission by clicking on the{' '}
              <FontAwesomeIcon icon="times" size="sm" /> icon next to "Use the
              Microphone". Now refresh the page.
            </ListItem>

            <ListItem>
              On Chrome, click on the{' '}
              <FontAwesomeIcon icon="info-circle" size="sm" /> icon in the "URL
              bar" and make sure the "Microphone" permission is set to "Allow"
              or "Ask". Now refresh the page.
            </ListItem>
          </List>
        </ListItem>
      </List>
    </Container>
  );
}

UserMediaError.propTypes = {
  err: PropTypes.shape({
    message: PropTypes.string.isRequired
  })
};
