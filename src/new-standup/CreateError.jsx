import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  padding: 1em;
  margin: 1em 0 0 0;
  color: var(--color-dark-red);
  border-left: 4px solid var(--color-red);
  background-color: var(--color-lightest-red);
`;

const Title = styled.h3`
  margin: 0 0 1em 0;
  color: var(--color-dark-red);
`;

const ListItem = styled.li`
  color: var(--color-dark-red);
`;

const Text = styled.p`
  color: var(--color-dark-red);
`;

function CreateError({ message, details }) {
  return (
    <Container>
      <Title>
        <FontAwesomeIcon icon="exclamation-triangle" /> Create failed: {message}
      </Title>

      {Array.isArray(details) ? (
        <>
          <ul>
            {details.map((detail, i) => {
              return <ListItem key={`err-details-${i}`}>{detail}</ListItem>;
            })}
          </ul>
        </>
      ) : (
        <Text>{details}</Text>
      )}
    </Container>
  );
}

CreateError.propTypes = {
  message: PropTypes.string.isRequired,
  details: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};

export default CreateError;
