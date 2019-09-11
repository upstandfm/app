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
`;

const Title = styled.h2`
  margin: 0.5em 0 0.25em 0;
`;

const Subtitle = styled.h3`
  margin: 0 0 1.5em 0;
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

        <Subtitle>
          Sorry! It looks like I couldn't fetch your data from the server.
        </Subtitle>

        <p>Please try again by refreshing this page.</p>

        <p>
          If that doesn&apos;t help, please send me an email to{' '}
          <a
            data-testid="support"
            href={`mailto:support@upstand.fm?subject=${title}`}
          >
            support@upstand.fm
          </a>
          .<br />
          I&apos;ll do my best to help as you as soon as possible.
        </p>
      </Wrapper>
    </Container>
  );
};

FetchError.propTypes = {
  title: PropTypes.string.isRequired,
  err: PropTypes.string
};

export default FetchError;
