import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components';

import Button from '../components/Button';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 1em;
  align-items: center;
  padding: 1em;
`;

const Actions = styled.div`
  display: grid;
  justify-items: end;
  padding: 2em 0;

  @media (max-width: 470px) {
    justify-items: center;
    padding: 1em 0;
  }
`;

const Main = styled.div``;

function Updates() {
  return (
    <Container>
      <Actions>
        <Button as={Link} to="new-update">
          New update
        </Button>
      </Actions>

      <Main />
    </Container>
  );
}

Updates.propTypes = {
  standupId: PropTypes.string.isRequired
};

export default Updates;
