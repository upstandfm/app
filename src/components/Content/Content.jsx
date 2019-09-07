import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 850px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0.5em 0 0 0;
  font-size: 34px;
  line-height: 1.17651;
  letter-spacing: 0.022em;
`;

const Subtitle = styled.h2`
  margin: 0;
  padding: 0.5em 0 0 0;
  font-size: 18px;
  line-height: 1.2223;
  letter-spacing: 0.022em;
`;

const Section = styled.section`
  margin: 1.5em 0 0 0;
  padding: 1.5em;
  border-radius: 8px;
  border: 1px solid var(--color-lighter-grey);
  background-color: var(--color-white);
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
`;

function Content(props) {
  const { title, subtitle } = props;

  return (
    <Container>
      <Title data-cy="title">{title}</Title>
      <Subtitle data-cy="subtitle">{subtitle}</Subtitle>
      <Section>{props.children}</Section>
    </Container>
  );
}

/**
 * Primary page content. You can pass one or more components as children.
 */
Content.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default Content;
