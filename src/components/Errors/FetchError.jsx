import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
`;

const Wrapper = styled.div`
  margin: 1em auto;
  padding: 1em;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0.5em 0 0.25em 0;
`;

const FetchError = function({ title, err }) {
  React.useEffect(() => {
    if (err) {
      console.error(title, '-', err);

      // TODO: error reporting
    }
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Wrapper>
        <Title>
          <FontAwesomeIcon icon="exclamation-triangle" /> {title}
        </Title>

        <p>Please try again by refreshing this page.</p>

        <p>
          If that doesn&apos;t help, send us an email to
          <br />
          <a href={`mailto:support@upstand.fm?subject=${title}`}>
            support@upstand.fm
          </a>
        </p>

        <p>We&apos;ll do our best to fix this as soon as possible.</p>
      </Wrapper>
    </Container>
  );
};

FetchError.propTypes = {
  title: PropTypes.string.isRequired,
  err: PropTypes.string
};

export default FetchError;
