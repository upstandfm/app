import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Container, WrapperLink, Title } from './Card';

const Wrapper = styled(WrapperLink).attrs(() => ({
  as: 'div'
}))`
  :hover {
    background-color: var(--color-lighter-coral);
    border: 1px solid var(--color-lighter-coral);
  }
`;

function CardPreview({ title }) {
  return (
    <Container as="div">
      <Wrapper title={title}>
        <Title>{title}</Title>
      </Wrapper>
    </Container>
  );
}

CardPreview.propTypes = {
  title: PropTypes.string.isRequired
};

export default CardPreview;
