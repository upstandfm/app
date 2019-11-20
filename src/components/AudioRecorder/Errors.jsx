import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSnackbar } from '../Snackbar';

const Container = styled.div`
  margin: 2em 0 1em 0;
  padding: 1em;
  background-color: var(--color-white);
  border: 1px solid var(--color-light-grey);
  border-radius: var(--radius-size);
  text-align: center;
`;

const Title = styled.h3`
  margin: 0;
`;

const Text = styled.p`
  margin: 0.5em 0;
`;

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
        <FontAwesomeIcon icon="lightbulb" size="sm" /> We can&apos;t record your
        update
      </Title>

      <Text>Sorry! Something unexpected happened.</Text>
    </Container>
  );
}
