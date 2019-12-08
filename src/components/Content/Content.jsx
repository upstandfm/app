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
`;

const Subtitle = styled.h2`
  margin: 0;
  padding: 0;
  font-weight: normal;
`;

const Section = styled.section`
  margin: 1.5em 0 0 0;
  padding: 1.5em;
  background-color: var(--color-white);
  border: 1px solid var(--color-light-grey);
  border-radius: var(--radius-size);
  box-shadow: 6px 6px 0 0 var(--color-light-grey);
`;

/**
 * Primary page content. You can pass one or more components as children.
 */
function Content(props) {
  const { title, subtitle } = props;

  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Section>{props.children}</Section>
    </Container>
  );
}

Content.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default Content;
