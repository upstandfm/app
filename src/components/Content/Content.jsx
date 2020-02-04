import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div``;

export const Title = styled.h2`
  margin: 0;
  padding: 0;
`;

export const Subtitle = styled.h3`
  margin: 0;
  padding: 0;
  font-weight: normal;
  color: var(--color-dark-grey);
`;

export const Section = styled.section`
  margin: 1em 0 1.5em 0;
  padding: 1em;
  background-color: var(--color-white);
  border-radius: var(--radius-size);
  box-shadow: 0px 1px 2px 0px rgba(25, 18, 56, 0.18);
`;

export const SectionTitle = styled.h3`
  margin: 0;
  padding-bottom: 0.5em;
  border-bottom: 1px solid var(--color-light-grey);
`;

/**
 * Primary page content. You can pass one or more components as children.
 */
function Content(props) {
  return <Container>{props.children}</Container>;
}

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Content;
